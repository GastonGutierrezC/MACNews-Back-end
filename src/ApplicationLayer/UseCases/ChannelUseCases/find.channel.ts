import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { ChannelInfoDto } from 'src/ApplicationLayer/dto/ChannelDTOs/channel-info.dto';
import { ChannelWithCreatorNameDto } from 'src/ApplicationLayer/dto/ChannelDTOs/channel-with-creator-name.dto';
import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';
import { IChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/channel.repository.interface';
import { FindFollowChannelService } from '../FollowChannelUseCases/find.followChannel';
import { FindNewsService } from '../NewsUseCases/find.news';
import { ChannelInfoJournalistDto } from 'src/ApplicationLayer/dto/ChannelDTOs/channel-info-jounalist.dto';
import { TopChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/top-channel.dto';

@Injectable()
export class FindChannelService {
  constructor(
    @Inject('IChannelRepository')
    private readonly channelRepository: IChannelRepository, 

    private readonly followChannelService: FindFollowChannelService,

    private readonly findNewsService: FindNewsService,
  ) {}


  async findById(ChannelID: string): Promise<ChannelInfoDto> {
    const channel = await this.channelRepository.findById(ChannelID);

    if (!channel) {
      throw new NotFoundException(`Channel with ID ${ChannelID} not found.`);
    }

    const user = channel.Journalist?.User;
    const creatorFullName = user
      ? `${user.UserFirstName} ${user.UserLastName}`
      : 'Nombre no disponible';

    const followers = await this.followChannelService.getFollowersCountByChannelId(ChannelID);
    const newsList = await this.findNewsService.getByChannelId(ChannelID);

    return {
      ChannelName: channel.ChannelName,
      DescriptionChannel: channel.DescriptionChannel,
      Specialties: channel.Specialties,
      ChannelImageURL: channel.ChannelImageURL,
      Specialty: channel.Journalist?.Specialty || '',
      JournalisticExperience: channel.Journalist?.JournalisticExperience || '',
      creatorFullName,
      followers,
      NumberNews: newsList.length,
    };
  }
  async findByJournalistId(journalistId: string): Promise<ChannelInfoJournalistDto> {
    const channels = await this.channelRepository.findAll(); // incluye Journalist y User
    const channel = channels.find(
      (c) => c.Journalist?.JournalistID === journalistId,
    );

    if (!channel) {
      throw new NotFoundException(
        `Channel for Journalist with ID ${journalistId} not found.`,
      );
    }

    const user = channel.Journalist?.User;
    const creatorFullName = user
      ? `${user.UserFirstName} ${user.UserLastName}`
      : 'Nombre no disponible';

    const followers = await this.followChannelService.getFollowersCountByChannelId(channel.ChannelID);
    const newsList = await this.findNewsService.getByChannelId(channel.ChannelID);

    return {
      ChannelName: channel.ChannelName,
      DescriptionChannel: channel.DescriptionChannel,
      Specialties: channel.Specialties,
      ChannelImageURL: channel.ChannelImageURL,
      Specialty: channel.Journalist?.Specialty || '',
      JournalisticExperience: channel.Journalist?.JournalisticExperience || '',
      creatorFullName,
      followers,
      NumberNews: newsList.length,
      ChannelId: channel.ChannelID,
    };
  }

  async findByChannelNameAndCreator(channelName: string, creatorFullName: string): Promise<ChannelInfoJournalistDto> {
    const channels = await this.channelRepository.findAll(); // Incluye Journalist y User
  
    const matchedChannel = channels.find((channel) => {
      const user = channel.Journalist?.User;
      const fullName = user ? `${user.UserFirstName} ${user.UserLastName}` : '';
      return (
        channel.ChannelName === channelName &&
        fullName.toLowerCase() === creatorFullName.toLowerCase()
      );
    });
  
    if (!matchedChannel) {
      throw new NotFoundException(
        `Channel with name "${channelName}" and creator "${creatorFullName}" not found.`
      );
    }
  
    const user = matchedChannel.Journalist?.User;
    const fullName = user ? `${user.UserFirstName} ${user.UserLastName}` : 'Nombre no disponible';
  
    const followers = await this.followChannelService.getFollowersCountByChannelId(matchedChannel.ChannelID);
    const newsList = await this.findNewsService.getByChannelId(matchedChannel.ChannelID);
  
    return {
      ChannelName: matchedChannel.ChannelName,
      DescriptionChannel: matchedChannel.DescriptionChannel,
      Specialties: matchedChannel.Specialties,
      ChannelImageURL: matchedChannel.ChannelImageURL,
      Specialty: matchedChannel.Journalist?.Specialty || '',
      JournalisticExperience: matchedChannel.Journalist?.JournalisticExperience || '',
      creatorFullName: fullName,
      followers,
      NumberNews: newsList.length,
      ChannelId: matchedChannel.ChannelID,
    };
  }
  

  async findTop5ChannelsByFollowers(): Promise<TopChannelDto[]> {
    const channels = await this.channelRepository.findAll();
  
    const channelsWithFollowers: TopChannelDto[] = await Promise.all(
      channels.map(async (channel) => {
        const followers = await this.followChannelService.getFollowersCountByChannelId(channel.ChannelID);
        
        const user = channel.Journalist?.User;
        const creatorFullName = user
          ? `${user.UserFirstName} ${user.UserLastName}`
          : 'Nombre no disponible';
        
        return {
          channelId: channel.ChannelID,
          channelName: channel.ChannelName,
          channelImageUrl: channel.ChannelImageURL,
          specialties: channel.Specialties,
          followers,
          CreatorFullName:creatorFullName

        };
      }),
    );
  
    return channelsWithFollowers
      .sort((a, b) => b.followers - a.followers)
      .slice(0, 5);
  }

}
