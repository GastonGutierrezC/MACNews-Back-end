import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSearchHistoryDto } from 'src/ApplicationLayer/dto/SearchHistoryDTOs/create-searchHistory.dto';
import { IPersonalizedRecommendationsAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/Interfaces/personalizedRecommendations.intelligentAgent.interface';
import { ISearchHistoryRepository } from 'src/InfrastructureLayer/Repositories/Interface/searchHistory.repository.interface';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';


@Injectable()
export class CreateSearchHistoryService {
  constructor(
    @Inject('ISearchHistoryRepository')
    private readonly searchHistoryRepository: ISearchHistoryRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPersonalizedRecommendationsAgent')
    private readonly personalizedAgent: IPersonalizedRecommendationsAgent, 
  ) {}


  async create(createSearchHistoryDto: CreateSearchHistoryDto, UserID : string): Promise<boolean> {
    const user = await this.userRepository.findById(UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
  
    const allSearchHistory = await this.searchHistoryRepository.findAll();
    const userSearchHistory = allSearchHistory.filter(
      (search) => search.User.UserID === UserID,
    );
  
    if (userSearchHistory.length >= 10) {
      await this.searchHistoryRepository.deleteOldestSearch(UserID);
    }
  
    await this.searchHistoryRepository.create({
      ...createSearchHistoryDto,
      User: user,
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
