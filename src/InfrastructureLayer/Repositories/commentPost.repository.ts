import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';
import { ICommentPostRepository } from './Interface/commentPost.repository.interface';

@Injectable()
export class CommentPostRepository implements ICommentPostRepository{
  constructor(
    @InjectRepository(CommentPostEntity)
    private readonly commentPostRepo: Repository<CommentPostEntity>,
  ) {}

  async findAll(): Promise<CommentPostEntity[]> {
    return await this.commentPostRepo.find({ relations: ['User', 'Channel', 'ParentComment'] });
  }

  async findById(CommentPostID: string): Promise<CommentPostEntity | null> {
    return await this.commentPostRepo.findOne({ where: { CommentPostID }, relations: ['User', 'Channel', 'ParentComment'] });
  }

  async create(commentData: Partial<CommentPostEntity>): Promise<CommentPostEntity> {
    const newComment = this.commentPostRepo.create(commentData);
    return await this.commentPostRepo.save(newComment);
  }

  async update(id: string, updateData: Partial<CommentPostEntity>): Promise<CommentPostEntity> {
    await this.commentPostRepo.update(id, updateData);
    return await this.findById(id);
  }
}
