import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateCommentPostDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/create-commentPost.dto';
import { CreateCommentPostService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/create.commentPost';
import { FindCommentPostService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/find.commentPost';
import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';


@ApiTags('CommentPost')
@Controller('comment-post')
export class CommentPostController {
  constructor(
    private readonly createCommentPostService: CreateCommentPostService,
    private readonly findCommentPostService: FindCommentPostService,

  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment post' })
  @ApiBody({
    type: CreateCommentPostDto,
  })
  async create(@Body() createCommentPostDto: CreateCommentPostDto): Promise<CommentPostEntity> {
    return this.createCommentPostService.create(createCommentPostDto);
  }

    @Get(':id')
    @ApiOperation({ summary: 'Find a comment post by ID' })
    async findById(@Param('id') id: string): Promise<CommentPostEntity> {
      return this.findCommentPostService.findById(id);
    }
  
    @Get('channel/:channelId')
    @ApiOperation({ summary: 'Find all comments from a channel, including subcomments' })
    async findByIdChannel(@Param('channelId') channelId: string): Promise<CommentPostEntity[]> {
      return this.findCommentPostService.findByIdChannel(channelId);
    }
}
