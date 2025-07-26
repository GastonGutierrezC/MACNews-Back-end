import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitsDto } from 'src/ApplicationLayer/dto/ VisitsDTOs/create-visits.dto';
import { IVisitRepository } from 'src/InfrastructureLayer/Repositories/Interface/visits.repository.interface';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { INewsRepository } from 'src/InfrastructureLayer/Repositories/Interface/news.repository.interface';
import { IPersonalizedRecommendationsAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/Interfaces/personalizedRecommendations.intelligentAgent.interface';

@Injectable()
export class CreateVisitsService {
  constructor(
    @Inject('IVisitRepository')
    private readonly visitsRepository: IVisitRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
    @Inject('IPersonalizedRecommendationsAgent')
    private readonly personalizedAgent: IPersonalizedRecommendationsAgent, 
    
  ) {}

  async create(createVisitsDto: CreateVisitsDto, UserID: string): Promise<boolean> {
    const user = await this.userRepository.findById(UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const news = await this.newsRepository.findById(createVisitsDto.NewsID);
    if (!news) {
      throw new NotFoundException('News not found.');
    }

    await this.visitsRepository.create({
      User: user,
      News: news,
    });

        (async () => {
      try {
        await this.personalizedAgent.getRecommendations(UserID);
      } catch (error) {
        console.warn(
          `⚠️ No se pudo ejecutar el agente de recomendaciones para el usuario ${UserID}:`,
          error.message,
        );
      }
    })();

    return true;
  }
}
