import { Inject, Injectable } from '@nestjs/common';
import { FindVisitsService } from '../VisitsUseCases/find.visits';
import { NewsCardDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-card.dto';
import { FindUserRecommendationService } from '../UserRecommendationsCases/find.recommendations';
import { INewsRepository } from 'src/InfrastructureLayer/Repositories/Interface/news.repository.interface';

@Injectable()
export class FindRecommendationsNewsService {
  constructor(
    private readonly findUserRecommendationService: FindUserRecommendationService,
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
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
        const user = news.Channel.Journalist?.User;
        const creatorFullName = user
          ? `${user.UserFirstName} ${user.UserLastName}`
          : 'Nombre no disponible';
        
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
          CreatorFullName: creatorFullName
        });
      }
    }

    return newsCards;
  }
}
