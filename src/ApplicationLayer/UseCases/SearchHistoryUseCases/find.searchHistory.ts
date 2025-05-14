import { Injectable, NotFoundException } from '@nestjs/common';
import { FindSearchHistoryDto } from 'src/ApplicationLayer/dto/SearchHistoryDTOs/find-searchHistory.dto';
import { SearchHistoryEntity } from 'src/DomainLayer/Entities/SearchHistory.entity';
import { SearchHistoryRepository } from 'src/InfrastructureLayer/Repositories/searchHistory.repository';

@Injectable()
export class FindSearchHistoryService {
  constructor(
    private readonly searchHistoryRepository: SearchHistoryRepository,
  ) {}

  async findByUserId(userId: string): Promise<FindSearchHistoryDto[]> {
    const searchHistories = await this.searchHistoryRepository.findAll(); 
    const userSearchHistory = searchHistories.filter(
      (history) => history.User.UserID === userId,
    );
    return userSearchHistory.map((history) => ({
      SearchWord: history.SearchWord,
    }));
  }
  
}