import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';

@Injectable()
export class FindNewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
  ) {}


  
  async getById(NewsId: string): Promise<NewsEntity> {
    const news = await this.newsRepository.findById(NewsId);
    if (!news) {
      throw new NotFoundException(`News with ID ${NewsId} not found`);
    }

    return news;
  }


  async getByTitle(Title: string): Promise<NewsEntity[]> {
    const news = await this.newsRepository.findAll();
    const filteredNews = news.filter(n => n.Title === Title);
    if (filteredNews.length === 0) {
      throw new NotFoundException(`No news found with title "${Title}"`);
    }
    return filteredNews;
  }

  async getByChannelId(ChannelID: string): Promise<NewsEntity[]> {
    const news = await this.newsRepository.findAll();
    const filteredNews = news.filter(n => n.Channel.ChannelID === ChannelID);
    if (filteredNews.length === 0) {
      throw new NotFoundException(`No news found for channel ID "${ChannelID}"`);
    }
    return filteredNews;
  }
}
