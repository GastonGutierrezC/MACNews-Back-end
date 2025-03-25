import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from '../../DomainLayer/Entities/news.entity';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepo: Repository<NewsEntity>,
  ) {}

  async findAll(): Promise<NewsEntity[]> {
    return await this.newsRepo.find({ relations: ['Channel'] });
  }

  async findById(NewsId: string): Promise<NewsEntity | undefined> {
    return await this.newsRepo.findOne({ where: { NewsId }, relations: ['Channel'] });
  }

  async create(newsData: Partial<NewsEntity>): Promise<NewsEntity> {
    const newNews = this.newsRepo.create(newsData);
    return await this.newsRepo.save(newNews);
  }

  async update(NewsId: string, updateData: Partial<NewsEntity>): Promise<void> {
    await this.newsRepo.update(NewsId, updateData);
  }
}
