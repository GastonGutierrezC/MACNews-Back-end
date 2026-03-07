import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IFollowChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/followChannel.repository.interface';
import { UnfollowChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/unfollow-channel.dto';

@Injectable()
export class UnfollowChannelService {
  constructor(
    @Inject('IFollowChannelRepository')
    private readonly followChannelRepository: IFollowChannelRepository,
  ) {}

  async unfollow(dto: UnfollowChannelDto): Promise<boolean> {
    const { UserID, ChannelID } = dto;

    
    const allFollowChannels = await this.followChannelRepository.findAll();

    
    const followFound = allFollowChannels.find(
      follow => 
        follow.User.UserID === UserID &&
        follow.Channel.ChannelID === ChannelID
    );

    if (!followFound) {
      throw new NotFoundException(
        `User ${UserID} is not following channel ${ChannelID}.`
      );
    }

    
    const followChannelID = followFound.FollowChannelID;

    
    await this.followChannelRepository.delete(followChannelID);

    
    const check = await this.followChannelRepository.findById(followChannelID);

    return check ? false : true;
  }
}
