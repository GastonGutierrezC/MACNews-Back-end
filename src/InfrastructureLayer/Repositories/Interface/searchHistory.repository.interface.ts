import { SearchHistoryEntity } from 'src/DomainLayer/Entities/SearchHistory.entity';
import { UserEntity } from 'src/DomainLayer/Entities/user.entity';

export interface ISearchHistoryRepository {
  findAll():  Promise<SearchHistoryEntity[]>;
  findById(SearchHistoryID: string): Promise<SearchHistoryEntity | null>;
  create(searchHistory: Partial<SearchHistoryEntity>): Promise<SearchHistoryEntity>;
  update(SearchHistoryID: string, updateData: Partial<SearchHistoryEntity>): Promise<SearchHistoryEntity>;
  deleteOldestSearch(userId: string): Promise<void>
}
