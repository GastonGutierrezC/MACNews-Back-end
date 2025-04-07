import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSearchHistoryDto } from 'src/ApplicationLayer/dto/SearchHistoryDTOs/create-searchHistory.dto';
import { SearchHistoryEntity } from 'src/DomainLayer/Entities/SearchHistory.entity';
import { SearchHistoryRepository } from 'src/InfrastructureLayer/Repositories/searchHistory.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';

@Injectable()
export class CreateSearchHistoryService {
  constructor(
    private readonly searchHistoryRepository: SearchHistoryRepository,
    private readonly userRepository: UserRepository,
  ) {}


  async create(createSearchHistoryDto: CreateSearchHistoryDto): Promise<SearchHistoryEntity> {
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

    const newSearchHistory = await this.searchHistoryRepository.create({
      ...createSearchHistoryDto,
      User: user,
    });

    return newSearchHistory;
  }
}
