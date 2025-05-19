import { Inject, Injectable } from '@nestjs/common';
import { FindSearchHistoryDto } from 'src/ApplicationLayer/dto/SearchHistoryDTOs/find-searchHistory.dto';
import { ISearchHistoryRepository } from 'src/InfrastructureLayer/Repositories/Interface/searchHistory.repository.interface';

@Injectable()
export class FindSearchHistoryService {
  constructor(
    @Inject('ISearchHistoryRepository')
    private readonly searchHistoryRepository: ISearchHistoryRepository,

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