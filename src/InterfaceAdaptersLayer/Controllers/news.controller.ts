import { Controller, Post, Body, Param, Put, Delete, Get, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from 'src/ApplicationLayer/dto/NewsDTOs/create-news.dto';
import { UpdateNewsDto } from 'src/ApplicationLayer/dto/NewsDTOs/update-news.dto';
import { NewsService } from 'src/ApplicationLayer/UseCases/news.service';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    return this.newsService.create(createNewsDto);
  }

  @Put(':id')
  async update(@Param('id') NewsId: string, @Body() updateNewsDto: UpdateNewsDto): Promise<NewsEntity> {
    return this.newsService.update(NewsId, updateNewsDto);
  }

  @Delete(':id')
  async delete(@Param('id') NewsId: string): Promise<void> {
    return this.newsService.delete(NewsId);
  }

  @Get(':id')
  async getById(@Param('id') NewsId: string): Promise<NewsEntity> {
    return this.newsService.getById(NewsId);
  }

  @Get('title/:title')
  async getByTitle(@Param('title') Title: string): Promise<NewsEntity[]> {
    return this.newsService.getByTitle(Title);
  }
}
