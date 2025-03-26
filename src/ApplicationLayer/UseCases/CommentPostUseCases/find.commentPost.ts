import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findByIdChannel(ChannelID: string): Promise<CommentPostEntity[]> {
    const allCommentPosts = await this.commentPostRepository.findAll();
    const channelComments = allCommentPosts.filter(
      (comment) => comment.Channel?.ChannelID === ChannelID,
    );

    if (channelComments.length === 0) {
      throw new NotFoundException(`No comments found for channel with ID ${ChannelID}.`);
    }

    const commentsWithSubcomments = channelComments.map((comment) => {
      return {
        ...comment,
        Subcomments: this.getSubcomments(comment.CommentPostID),
      };
    });

    return commentsWithSubcomments;
  }

  private async getSubcomments(parentCommentId: string): Promise<CommentPostEntity[]> {
    return (await this.commentPostRepository.findAll()).filter(
      (comment) => comment.ParentComment?.CommentPostID === parentCommentId,
    );
  }
}
