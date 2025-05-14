import { Injectable } from '@nestjs/common';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { FindVisitsService } from '../VisitsUseCases/find.visits';
import { NewsCardDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-card.dto';
import { FindUserRecommendationService } from '../UserRecommendationsCases/find.recommendations';

@Injectable()
export class FindRecommendationsNewsService {
  constructor(
    private readonly findUserRecommendationService: FindUserRecommendationService,
    private readonly newsRepository: NewsRepository,
    private readonly findVisitsService: FindVisitsService,
  ) {}

  async getPersonalizedNews(userId: string): Promise<NewsCardDto[]> {
    const recommendation = await this.findUserRecommendationService.getByUserId(userId);

    const suggestedNewsIds = recommendation.NewsArticleIDs;
    const newsCards: NewsCardDto[] = [];

    for (const newsId of suggestedNewsIds) {
      const news = await this.newsRepository.findById(newsId);
      if (news) {
        const visitData = await this.findVisitsService.getVisitCountByNews(news.NewsId);
        newsCards.push({
          NewsId: news.NewsId,
          Title: news.Title,
          PublicationDate: news.PublicationDate,
          NewsImageURL: news.NewsImageURL,
          Categories: news.Categories,
          Channel: {
            ChannelID: news.Channel.ChannelID,
            ChannelName: news.Channel.ChannelName,
            ChannelImageURL: news.Channel.ChannelImageURL,
          },
          VisitCount: visitData.visitCount,
        });
      }
    }

    return newsCards;
  }
}
