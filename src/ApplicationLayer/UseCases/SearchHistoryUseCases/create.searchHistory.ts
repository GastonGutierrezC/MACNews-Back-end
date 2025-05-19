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


  async create(createSearchHistoryDto: CreateSearchHistoryDto): Promise<boolean> {
    const user = await this.userRepository.findById(createSearchHistoryDto.UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
  
    const allSearchHistory = await this.searchHistoryRepository.findAll();
    const userSearchHistory = allSearchHistory.filter(
      (search) => search.User.UserID === createSearchHistoryDto.UserID,
    );
  
    if (userSearchHistory.length >= 10) {
      await this.searchHistoryRepository.deleteOldestSearch(createSearchHistoryDto.UserID);
    }
  
    await this.searchHistoryRepository.create({
      ...createSearchHistoryDto,
      User: user,
    });

    (async () => {
      try {
        await this.personalizedAgent.getRecommendations(createSearchHistoryDto.UserID);
      } catch (error) {
        console.warn(
          `⚠️ No se pudo ejecutar el agente de recomendaciones para el usuario ${createSearchHistoryDto.UserID}:`,
          error.message,
        );
      }
    })();
  
    return true;
  }
  
}
