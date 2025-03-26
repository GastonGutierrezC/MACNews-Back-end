import { Injectable, NotFoundException } from '@nestjs/common';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';
import { FollowChannelRepository } from 'src/InfrastructureLayer/Repositories/followChannel.repository';


@Injectable()
export class FindFollowChannelService {
  constructor(
    private readonly followChannelRepository: FollowChannelRepository,
  ) {}

  async getById(FollowChannelID: string): Promise<FollowChannelEntity> {
    const followChannel = await this.followChannelRepository.findById(FollowChannelID);
    
    if (!followChannel) {
      throw new NotFoundException(`FollowChannel with ID ${FollowChannelID} not found.`);
    }

    return followChannel;
  }


  async getByUserId(UserID: string): Promise<FollowChannelEntity[]> {
    const allFollowChannels = await this.followChannelRepository.findAll();
    
    const userFollowedChannels = allFollowChannels.filter(follow => follow.User.UserID === UserID);

    return userFollowedChannels;
  }
}
