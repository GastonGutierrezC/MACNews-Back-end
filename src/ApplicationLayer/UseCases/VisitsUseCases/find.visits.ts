import { Injectable, NotFoundException } from '@nestjs/common';
import { VisitsRepository } from 'src/InfrastructureLayer/Repositories/visits.repository';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';
import { VisitCountByNewsDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/visit-count-by-news.dto';
import { VisitedNewsByUserDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/visited-news-by-user.dto';


@Injectable()
export class FindVisitsService {
  constructor(
    private readonly visitsRepository: VisitsRepository,
    private readonly userRepository: UserRepository,
    private readonly newsRepository: NewsRepository,
  ) {}

  async getVisitedNewsByUser(userId: string): Promise<VisitedNewsByUserDto[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const visits = await this.visitsRepository.findAll();
    const userVisits = visits.filter((visit) => visit.User?.UserID === userId && visit.News);
  
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
