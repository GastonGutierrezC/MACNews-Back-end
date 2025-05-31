import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FollowedChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/followed-channel.dto';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';
import { IFollowChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/followChannel.repository.interface';


@Injectable()
export class FindFollowChannelService {
  constructor(

    @Inject('IFollowChannelRepository')
    private readonly followChannelRepository: IFollowChannelRepository,
    
  ) {}

  async getById(FollowChannelID: string): Promise<FollowChannelEntity> {
    const followChannel = await this.followChannelRepository.findById(FollowChannelID);
    
    if (!followChannel) {
      throw new NotFoundException(`FollowChannel with ID ${FollowChannelID} not found.`);
    }

    return followChannel;
  }


  async getByUserId(UserID: string): Promise<FollowedChannelDto[]> {
    const allFollowChannels = await this.followChannelRepository.findAll();
  
    const userFollowedChannels: FollowedChannelDto[] = allFollowChannels
      .filter(follow => follow.User.UserID === UserID)
      .map(follow => {
        const user = follow.Channel.Journalist?.User;
        const creatorFullName = user
          ? `${user.UserFirstName} ${user.UserLastName}`
          : 'Nombre no disponible';
  
        return {
          ChannelID: follow.Channel.ChannelID,
          ChannelName: follow.Channel.ChannelName,
          ChannelImageURL: follow.Channel.ChannelImageURL,
          CreatorFullName: creatorFullName,
        };
      });
  
    return userFollowedChannels;
  }
  

  async getFollowersCountByChannelId(ChannelID: string): Promise<number> {
    const allFollowChannels = await this.followChannelRepository.findAll();

    const followers = allFollowChannels.filter(follow => follow.Channel.ChannelID === ChannelID);

    return followers.length;
  }
}
