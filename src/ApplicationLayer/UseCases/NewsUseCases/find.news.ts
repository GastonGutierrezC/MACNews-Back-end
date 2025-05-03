import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { NewsSummaryDto } from 'src/ApplicationLayer/dto/NewsDTOs/find-news.dto';
import { NewsCardDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-card.dto';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { FindVisitsService } from '../VisitsUseCases/find.visits';
import { NewsTopDto } from 'src/ApplicationLayer/dto/NewsDTOs/findTopNews.dto';

@Injectable()
export class FindNewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly findVisitsService: FindVisitsService,
  ) {}


  
  async getById(NewsId: string): Promise<NewsEntity> {
    const news = await this.newsRepository.findById(NewsId);
    if (!news) {
      throw new NotFoundException(`News with ID ${NewsId} not found`);
    }

    return news;
  }
  async getAllAsCards(): Promise<NewsCardDto[]> {
    const newsList = await this.newsRepository.findAll();
  
    const newsCards: NewsCardDto[] = await Promise.all(
      newsList.map(async (n) => {
        const visitData = await this.findVisitsService.getVisitCountByNews(n.NewsId);
        return {
          NewsId: n.NewsId,
          Title: n.Title,
          PublicationDate: n.PublicationDate,
          NewsImageURL: n.NewsImageURL,
          Categories: n.Categories,
          Channel: {
            ChannelID: n.Channel.ChannelID,
            ChannelName: n.Channel.ChannelName,
            ChannelImageURL: n.Channel.ChannelImageURL
          },
          VisitCount: visitData.visitCount, 
        };
      }),
    );
  
    return newsCards;
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

  async getAllSummarized(): Promise<NewsTopDto[]> {
    const news = await this.newsRepository.findAll();
  
  
    const newsWithVisits = await Promise.all(
      news.map(async (n) => {
        const visitData = await this.findVisitsService.getVisitCountByNews(n.NewsId);
        return {
          news: n,
          visitCount: visitData.visitCount
        };
      })
    );
  
  
    const sorted = newsWithVisits.sort((a, b) => b.visitCount - a.visitCount);
  
   
    return sorted.map(item => ({
      NewsID: item.news.NewsId,
      Title: item.news.Title,
      NewsImageURL: item.news.NewsImageURL
    }));
  }
  
}
