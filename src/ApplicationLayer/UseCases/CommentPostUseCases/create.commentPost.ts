import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateCommentPostDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/create-commentPost.dto';
import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';
import { IChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/channel.repository.interface';
import { ICommentPostRepository } from 'src/InfrastructureLayer/Repositories/Interface/commentPost.repository.interface';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';


@Injectable()
export class CreateCommentPostService {
  constructor(

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICommentPostRepository')
    private readonly commentPostRepository: ICommentPostRepository,
    @Inject('IChannelRepository')
    private readonly channelRepository: IChannelRepository, 

  ) {}

  async create(createCommentPostDto: CreateCommentPostDto): Promise<CommentPostEntity> {
    const user = await this.userRepository.findById(createCommentPostDto.UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const channel = await this.channelRepository.findById(createCommentPostDto.ChannelID);
    if (!channel) {
      throw new NotFoundException('Channel not found.');
    }


    let parentComment = null;
    if (createCommentPostDto.ParentComment) {
      parentComment = await this.commentPostRepository.findById(createCommentPostDto.ParentComment);
      if (!parentComment) {
        throw new NotFoundException('Parent comment not found.');
      }
    }

    const newComment = await this.commentPostRepository.create({
      User: user,
      Channel: channel,
      ParentComment: parentComment,
      TextComment: createCommentPostDto.TextComment,
    });

    return newComment;
  }
}
