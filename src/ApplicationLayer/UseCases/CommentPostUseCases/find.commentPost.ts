import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentWithSubcommentsDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/comment-with-subcomments.dto';
import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';
import { CommentPostRepository } from 'src/InfrastructureLayer/Repositories/commentPost.repository';


@Injectable()
export class FindCommentPostService {
  constructor(
    private readonly commentPostRepository: CommentPostRepository,
  ) {}

  async findById(CommentPostID: string): Promise<CommentPostEntity> {
    const commentPost = await this.commentPostRepository.findById(CommentPostID);
    if (!commentPost) {
      throw new NotFoundException(`CommentPost with ID ${CommentPostID} not found.`);
    }
    return commentPost;
  }

  async findByIdChannel(ChannelID: string): Promise<any> {
    const allComments = await this.commentPostRepository.findAll();
  
    const channelComments = allComments.filter(
      (comment) => comment.Channel?.ChannelID === ChannelID,
    );
  
    if (channelComments.length === 0) {
      throw new NotFoundException(`No comments found for channel with ID ${ChannelID}.`);
    }
  
    const rootComments = channelComments.filter(c => !c.ParentComment);
    const subComments = channelComments.filter(c => !!c.ParentComment);
  
    const subMap = subComments.reduce((acc, comment) => {
      const parentId = comment.ParentComment.CommentPostID;
      if (!acc[parentId]) acc[parentId] = [];
      acc[parentId].push({
        CommentPostID: comment.CommentPostID,
        TextComment: comment.TextComment,
        DateComment: comment.DateComment,
      });
      return acc;
    }, {} as Record<string, any[]>);
  
    const commentsWithSub = rootComments.map((comment) => {
      const baseComment = {
        CommentPostID: comment.CommentPostID,
        TextComment: comment.TextComment,
        DateComment: comment.DateComment,
      };
  
      const subcomments = subMap[comment.CommentPostID];
      if (subcomments && subcomments.length > 0) {
        return {
          ...baseComment,
          Subcomments: subcomments,
        };
      }
  
      return baseComment;
    });
  
    return {
      ChannelID,
      Comments: commentsWithSub,
    };
  }
  
  
}
