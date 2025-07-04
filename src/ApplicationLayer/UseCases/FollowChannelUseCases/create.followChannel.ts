import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { CreateFollowChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/create-followChannel.dto';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { IFollowChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/followChannel.repository.interface';
import { IChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/channel.repository.interface';

@Injectable()
export class CreateFollowChannelService {
  constructor(

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IFollowChannelRepository')
    private readonly followChannelRepository: IFollowChannelRepository,
    @Inject('IChannelRepository')
    private readonly channelRepository: IChannelRepository, 
  ) {}

  async create(createFollowChannelDto: CreateFollowChannelDto, UserID: string): Promise<boolean> {
    const user = await this.userRepository.findById(UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const channel = await this.channelRepository.findById(createFollowChannelDto.ChannelID);
    if (!channel) {
      throw new NotFoundException('Channel not found.');
    }
    

    const allFollows = await this.followChannelRepository.findAll();
    const existingFollow = allFollows.find(
      (follow) =>
        follow.User.UserID === UserID &&
        follow.Channel.ChannelID === createFollowChannelDto.ChannelID,
    );

    if (existingFollow) {
      throw new BadRequestException('User is already following this channel.');
    }

    await this.followChannelRepository.create({
      User: user,
      Channel: channel,
    });

    return true;
  }
  
}
