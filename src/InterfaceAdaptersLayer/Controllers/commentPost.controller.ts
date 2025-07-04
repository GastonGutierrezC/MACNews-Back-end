import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ActiveUser } from 'src/ApplicationLayer/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/ApplicationLayer/decorators/active-user.interface';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { CommentDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/comment-response.dto';
import { CommentWithSubcommentsDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/comment-with-subcomments.dto';
import { CommentsByChannelResponseDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/comments-by-channel-response.dto';
import { CreateCommentPostDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/create-commentPost.dto';
import { CreateCommentPostService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/create.commentPost';
import { FindCommentPostService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/find.commentPost';
import { FindChannelMetricsService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/findMetricts.commentPost';
import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';
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
  @Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: CreateCommentPostDto,
  })
  async create(@ActiveUser() user: ActiveUserInterface,@Body() createCommentPostDto: CreateCommentPostDto): Promise<CommentDto> {

    return this.createCommentPostService.create(createCommentPostDto,user.userID);
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
@Auth(RoleAssigned.Administrator)
@ApiBearerAuth('access-token')
@ApiOperation({ summary: 'Find all comments from a channel, with pagination' })
async findAllByIdChannel(
  @Param('channelId') channelId: string,

): Promise<CommentsByChannelResponseDto> {


  return this.findCommentPostService.findAllByIdChannel(channelId );
}



    @Get('metrics/:channelId')
    @ApiOperation({ summary: 'Analyze user interest metrics for a specific channel using AI' })
    @Auth(RoleAssigned.Journalist)
    @ApiBearerAuth('access-token')
    async getChannelMetrics(@Param('channelId') channelId: string): Promise<AgentResponse> {
      return this.findChannelMetricsService.execute(channelId);
    }
}
