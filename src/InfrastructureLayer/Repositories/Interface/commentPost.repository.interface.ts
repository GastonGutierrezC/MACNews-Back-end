import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';

export interface ICommentPostRepository{
  findAll(): Promise<CommentPostEntity[]> ;
  findById(CommentPostID: string): Promise<CommentPostEntity | null> ;
  create(commentData: Partial<CommentPostEntity>): Promise<CommentPostEntity>  ;
  update(id: string, updateData: Partial<CommentPostEntity>): Promise<CommentPostEntity>;

}
