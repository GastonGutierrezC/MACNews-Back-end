import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { CreateNewsDto } from '../../dto/NewsDTOs/create-news.dto';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';  

@Injectable()
export class CreateNewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly channelRepository: ChannelRepository,  
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<NewsEntity> {

    const channel = await this.channelRepository.findById(createNewsDto.ChannelID);
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${createNewsDto.ChannelID} not found`);
    }

    const news = await this.newsRepository.create({
      ...createNewsDto,
      Channel: channel, 
    });

    return news;
  }

}
