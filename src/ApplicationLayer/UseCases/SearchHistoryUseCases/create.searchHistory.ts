import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSearchHistoryDto } from 'src/ApplicationLayer/dto/SearchHistoryDTOs/create-searchHistory.dto';
import { SearchHistoryEntity } from 'src/DomainLayer/Entities/SearchHistory.entity';
import { PersonalizedRecommendationsAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/PersonalizedRecommendations.IntellidentsAgents';
import { SearchHistoryRepository } from 'src/InfrastructureLayer/Repositories/searchHistory.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';

@Injectable()
export class CreateSearchHistoryService {
  constructor(
    private readonly searchHistoryRepository: SearchHistoryRepository,
    private readonly userRepository: UserRepository,
    private readonly personalizedAgent: PersonalizedRecommendationsAgent, 
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
