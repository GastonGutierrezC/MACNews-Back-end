import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';
import { FollowChannelRepository } from 'src/InfrastructureLayer/Repositories/followChannel.repository';
import { CreateFollowChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/create-followChannel.dto';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';

@Injectable()
export class CreateFollowChannelService {
  constructor(
    private readonly followChannelRepository: FollowChannelRepository,
    private readonly userRepository: UserRepository,
    private readonly channelRepository: ChannelRepository,

  ) {}

  async create(createFollowChannelDto: CreateFollowChannelDto): Promise<FollowChannelEntity> {
    const user = await this.userRepository.findById(createFollowChannelDto.UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const channel = await this.channelRepository.findById(createFollowChannelDto.ChannelID);
    if (!channel) {
      throw new NotFoundException('Channel not found.');
    }

    const allFollows = await this.followChannelRepository.findAll();
    const existingFollow = allFollows.find(
      (follow) => follow.User.UserID === createFollowChannelDto.UserID && follow.Channel.ChannelID === createFollowChannelDto.ChannelID,
    );

    if (existingFollow) {
      throw new BadRequestException('User is already following this channel.');
    }

    const followChannel = this.followChannelRepository.create({
      User: user,
      Channel: channel,
    });

    return followChannel;
  }
  

}
