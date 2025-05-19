import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { PasswordEntity } from 'src/DomainLayer/Entities/pasword.entity';

export interface INewsRepository {
  findAll():Promise<NewsEntity[]> ;
  findById(NewsId: string): Promise<NewsEntity | undefined> ;
  create(newsData: Partial<NewsEntity>): Promise<NewsEntity>  ;
  update(NewsId: string, updateData: Partial<NewsEntity>): Promise<void>;

}
