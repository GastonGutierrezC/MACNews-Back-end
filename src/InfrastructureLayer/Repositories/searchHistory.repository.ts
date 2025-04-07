import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchHistoryEntity } from 'src/DomainLayer/Entities/SearchHistory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchHistoryRepository {
  constructor(
    @InjectRepository(SearchHistoryEntity)
    private readonly searchHistoryRepo: Repository<SearchHistoryEntity>,
  ) {}

  async findAll(): Promise<SearchHistoryEntity[]> {
    return await this.searchHistoryRepo.find({ relations: ['User'] });
  }

  async findById(SearchHistoryID: string): Promise<SearchHistoryEntity | null> {
    return await this.searchHistoryRepo.findOne({ where: { SearchHistoryID } });
  }

  async create(searchHistory: Partial<SearchHistoryEntity>): Promise<SearchHistoryEntity> {
    const newSearchHistory = this.searchHistoryRepo.create(searchHistory);
    return await this.searchHistoryRepo.save(newSearchHistory);
  }

  async update(SearchHistoryID: string, updateData: Partial<SearchHistoryEntity>): Promise<SearchHistoryEntity> {
    await this.searchHistoryRepo.update(SearchHistoryID, updateData);
    return await this.findById(SearchHistoryID);
  }

  async deleteOldestSearch(userId: string): Promise<void> {
    const oldestSearch = await this.searchHistoryRepo.findOne({
      where: { User: { UserID: userId } },
      order: { SearchDate: 'ASC' }, 
    });
  
    if (oldestSearch) {
      await this.searchHistoryRepo.remove(oldestSearch);
    }
  }
  
  
}
