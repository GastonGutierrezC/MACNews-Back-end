import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CommentDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/comment-response.dto';
import { CommentWithSubcommentsDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/comment-with-subcomments.dto';
import { CommentsByChannelResponseDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/comments-by-channel-response.dto';
import { CreateCommentPostDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/create-commentPost.dto';
import { CreateCommentPostService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/create.commentPost';
import { FindCommentPostService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/find.commentPost';
import { FindChannelMetricsService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/findMetricts.commentPost';
import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';
import { AgentResponse } from 'src/InfrastructureLayer/IntelligentAgentManagement/DTO.IntelligentAgent/NewsReview/agent-response.dto';


@ApiTags('CommentPost')
@Controller('comment-post')
export class CommentPostController {
  constructor(
    private readonly createCommentPostService: CreateCommentPostService,
    private readonly findCommentPostService: FindCommentPostService,
    private readonly findChannelMetricsService: FindChannelMetricsService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Create a new comment post' })
  @ApiBody({
    type: CreateCommentPostDto,
  })
  async create(@Body() createCommentPostDto: CreateCommentPostDto): Promise<CommentDto> {
    // Llama al servicio y devuelve el CommentDto con estructura solicitada
    return this.createCommentPostService.create(createCommentPostDto);
  }
    @Get(':id')
    @ApiOperation({ summary: 'Find a comment post by ID' })
    async findById(@Param('id') id: string): Promise<CommentPostEntity> {
      return this.findCommentPostService.findById(id);
    }
  
@Get('channel/:channelId')
@ApiOperation({ summary: 'Find all comments from a channel, with pagination' })
@ApiQuery({ name: 'page', required: true, type: Number })
@ApiQuery({ name: 'limit', required: true, type: Number })
async findByIdChannel(
  @Param('channelId') channelId: string,
  @Query('page') page = '1',
  @Query('limit') limit = '10',
): Promise<CommentsByChannelResponseDto> {
  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);

  return this.findCommentPostService.findByIdChannel(channelId, parsedPage, parsedLimit);
}

@Get('Allchannel/:channelId')
@ApiOperation({ summary: 'Find all comments from a channel, with pagination' })
async findAllByIdChannel(
  @Param('channelId') channelId: string,

): Promise<CommentsByChannelResponseDto> {


  return this.findCommentPostService.findAllByIdChannel(channelId );
}



    @Get('metrics/:channelId')
    @ApiOperation({ summary: 'Analyze user interest metrics for a specific channel using AI' })
    async getChannelMetrics(@Param('channelId') channelId: string): Promise<AgentResponse> {
      return this.findChannelMetricsService.execute(channelId);
    }
}
