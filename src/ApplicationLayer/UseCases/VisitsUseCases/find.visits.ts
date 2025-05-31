import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VisitCountByNewsDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/visit-count-by-news.dto';
import { VisitedNewsByUserDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/visited-news-by-user.dto';
import { IVisitRepository } from 'src/InfrastructureLayer/Repositories/Interface/visits.repository.interface';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { INewsRepository } from 'src/InfrastructureLayer/Repositories/Interface/news.repository.interface';
import { NewsCategory } from 'src/DomainLayer/Entities/news.entity';

@Injectable()
export class FindVisitsService {
  constructor(
    @Inject('IVisitRepository')
    private readonly visitsRepository: IVisitRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,    
  ) {}

  async getVisitedNewsByUser(userId: string): Promise<VisitedNewsByUserDto[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const visits = await this.visitsRepository.findAll();
    const userVisits = visits.filter((visit) => visit.User?.UserID === userId && visit.News);
  
    if (userVisits.length === 0) {
      return [{
        Title: 'not news',
        Category:'not news',
      }];
    }
  
    return userVisits.map((visit) => ({
      Title: visit.News.Title,
      Category: visit.News.Categories,
    }));
  }
  
  

  async getVisitCountByNews(newsId: string): Promise<VisitCountByNewsDto> {
    const news = await this.newsRepository.findById(newsId);
    if (!news) {
      throw new NotFoundException('News not found');
    }

    const visits = await this.visitsRepository.findAll();
    const newsVisits = visits.filter((visit) => visit.News.NewsId === newsId);

    return {
      visitCount: newsVisits.length,
    };
  }
}
