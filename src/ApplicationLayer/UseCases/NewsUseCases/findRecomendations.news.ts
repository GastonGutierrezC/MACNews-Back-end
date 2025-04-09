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

    // Extraemos los NewsId sugeridos
    const suggestedNewsIds = recommendationResponse.sugerencias.map(s => s.NewsId);

    // Buscamos todas las noticias existentes
    const allNews = await this.newsRepository.findAll();

    // Filtramos las que coincidan con los IDs sugeridos por el agente
    const filteredNews = allNews.filter(n => suggestedNewsIds.includes(n.NewsId));

    // Si no hay coincidencias, retornamos una lista vacía (opcional: lanzar NotFound)
    if (filteredNews.length === 0) {
      return [];
    }

    // Convertimos a formato resumido
    return filteredNews.map(n => ({
      NewsID: n.NewsId,
      Title: n.Title,
      Category: n.Categories,
    }));
  }
}
