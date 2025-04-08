import { Controller, Post, Body, Param, Patch, Delete, Get, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateNewsDto } from 'src/ApplicationLayer/dto/NewsDTOs/create-news.dto';
import { NewsSummaryDto } from 'src/ApplicationLayer/dto/NewsDTOs/find-news.dto';
import { UpdateStatusNewsDto } from 'src/ApplicationLayer/dto/NewsDTOs/update-news-status.dto';
import { CreateNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/create.news';
import { FindNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/find.news';
import { UpdateNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/update.news';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    private readonly createNewsService: CreateNewsService,
    private readonly findNewsService: FindNewsService,
    private readonly updateNewsService: UpdateNewsService,
  
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create news' })
  @ApiBody({
    type: CreateNewsDto,
  })   
  async create(@Body() createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    return this.createNewsService.create(createNewsDto);
  }

  @ApiOperation({ summary: 'update the news status' })
  @ApiBody({
    type: UpdateStatusNewsDto,
  })   
  @Patch(':id')
  async update(@Param('id') NewsId: string, @Body() updateNewsDto: UpdateStatusNewsDto): Promise<NewsEntity> {
    return this.updateNewsService.update(NewsId, updateNewsDto);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get the news by ID' })
  async getById(@Param('id') NewsId: string): Promise<NewsEntity> {
    return this.findNewsService.getById(NewsId);
  }

  @Get('title/:title')
  @ApiOperation({ summary: 'Get the news by title' })

  async getByTitle(@Param('title') Title: string): Promise<NewsEntity[]> {
    return this.findNewsService.getByTitle(Title);
  }


  @Get('channel/:channel')
  @ApiOperation({ summary: 'Get the news by channel ID' })
  async getByChannel(@Param('channel') channelId: string): Promise<NewsEntity[]> {
    return this.findNewsService.getByChannelId(channelId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news summarized (ID, Title, Category)' })
  async getAllSummarized(): Promise<NewsSummaryDto[]> {
    return this.findNewsService.getAllSummarized();
  }
}
