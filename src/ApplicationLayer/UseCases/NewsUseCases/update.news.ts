import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { UpdateStatusNewsDto } from '../../dto/NewsDTOs/update-news-status.dto';
import { INewsRepository } from 'src/InfrastructureLayer/Repositories/Interface/news.repository.interface';

@Injectable()
export class UpdateNewsService {
  constructor(

    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
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
