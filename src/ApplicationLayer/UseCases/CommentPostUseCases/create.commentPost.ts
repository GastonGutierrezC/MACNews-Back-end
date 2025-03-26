import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCommentPostDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/create-commentPost.dto';
import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';
import { CommentPostRepository } from 'src/InfrastructureLayer/Repositories/commentPost.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';


@Injectable()
export class CreateCommentPostService {
  constructor(
    private readonly commentPostRepository: CommentPostRepository,
    private readonly userRepository: UserRepository,
    private readonly channelRepository: ChannelRepository,
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
