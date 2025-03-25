import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { UpdateStatusNewsDto } from '../../dto/NewsDTOs/update-news-status.dto';

@Injectable()
export class UpdateNewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
  ) {}


  async update(NewsId: string, updateNewsDto: UpdateStatusNewsDto): Promise<NewsEntity> {
    const news = await this.newsRepository.findById(NewsId);
    if (!news) {
      throw new NotFoundException(`News with ID ${NewsId} not found`);
    }

    await this.newsRepository.update(NewsId, { NewsStatus: updateNewsDto.NewsStatus });

    return this.newsRepository.findById(NewsId); 
  }





}
