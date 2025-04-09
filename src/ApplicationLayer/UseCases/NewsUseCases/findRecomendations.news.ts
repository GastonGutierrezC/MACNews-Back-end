import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { NewsSummaryDto } from 'src/ApplicationLayer/dto/NewsDTOs/find-news.dto';
import { PersonalizedRecommendationsAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/PersonalizedRecommendations.IntellidentsAgents';

@Injectable()
export class FindRecommendationsNewsService {
  constructor(
    private readonly personalizedAgent: PersonalizedRecommendationsAgent,
    private readonly newsRepository: NewsRepository,
  ) {}

  async getPersonalizedNews(userId: string): Promise<NewsSummaryDto[]> {
    const recommendationResponse = await this.personalizedAgent.getRecommendations(userId);

    const suggestedNewsIds = recommendationResponse.sugerencias.map(s => s.NewsId);
    const allNews = await this.newsRepository.findAll();
    const filteredNews = allNews.filter(n => suggestedNewsIds.includes(n.NewsId));

    if (filteredNews.length === 0) {
      return [];
    }

    return filteredNews.map(n => ({
      NewsID: n.NewsId,
      Title: n.Title,
      Category: n.Categories,
    }));
  }
}
