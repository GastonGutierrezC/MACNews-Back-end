import { Injectable } from '@nestjs/common';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { PersonalizedRecommendationsAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/PersonalizedRecommendations.IntellidentsAgents';
import { FindVisitsService } from '../VisitsUseCases/find.visits';
import { NewsCardDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-card.dto';

@Injectable()
export class FindRecommendationsNewsService {
  constructor(
    private readonly personalizedAgent: PersonalizedRecommendationsAgent,
    private readonly newsRepository: NewsRepository,
    private readonly findVisitsService: FindVisitsService,
  ) {}

  async getPersonalizedNews(userId: string): Promise<NewsCardDto[]> {
    let recommendationResponse = null;

    
    while (!recommendationResponse || !recommendationResponse.sugerencias || recommendationResponse.sugerencias.length === 0) {
      try {
        recommendationResponse = await this.personalizedAgent.getRecommendations(userId);
        
        if (!recommendationResponse?.sugerencias?.length) {
          
          await new Promise(res => setTimeout(res, 3000));
        }

      } catch (error) {
        console.error('⚠️ Error al obtener recomendaciones del agente. Reintentando...', error.message);
        await new Promise(res => setTimeout(res, 3000)); 
      }
    }

    const suggestedNewsIds = recommendationResponse.sugerencias.map(s => s.NewsId);
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
