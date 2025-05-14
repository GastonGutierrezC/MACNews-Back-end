import { Controller, Post, Body, Param, Patch, Delete, Get, NotFoundException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateNewsDto } from 'src/ApplicationLayer/dto/NewsDTOs/create-news.dto';
import { NewsSummaryDto } from 'src/ApplicationLayer/dto/NewsDTOs/find-news.dto';
import { NewsTopDto } from 'src/ApplicationLayer/dto/NewsDTOs/findTopNews.dto';
import { NewsCardDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-card.dto';
import { UpdateStatusNewsDto } from 'src/ApplicationLayer/dto/NewsDTOs/update-news-status.dto';
import { CreateNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/create.news';
import { FindNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/find.news';
import { FindRecommendationsNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/findRecomendations.news';
import { UpdateNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/update.news';
import { NewsCategory, NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { Query } from '@nestjs/common';
import { NewsDocumentDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-document.dto';
import { ChannelSpecialties } from 'src/DomainLayer/Entities/channel.entity';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    private readonly createNewsService: CreateNewsService,
    private readonly findNewsService: FindNewsService,
    private readonly updateNewsService: UpdateNewsService,
    private readonly findRecommendationsNewsService: FindRecommendationsNewsService,
  
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

  @Get('card')
  @ApiOperation({ summary: 'Get all news formatted for card view with pagination' })
  async getAllNewsCards(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<NewsCardDto[]> {
    return this.findNewsService.getAllAsCards(page, limit);
  }
  
  @Get('category/:category')
  @ApiOperation({ summary: 'Get news filtered by category' })
  async getByCategory(
    @Param('category') category: NewsCategory,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<NewsCardDto[]> {
    const news = await this.findNewsService.getByCategory(category, page, limit);
    return news || [];
  
  }

  @Get('specialty/:specialty')
  @ApiOperation({ summary: 'Get news filtered by channel specialty' })
  async getBySpecialty(
    @Param('specialty') specialty: ChannelSpecialties,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<NewsCardDto[]> {
    const news = await this.findNewsService.getBySpecialty(specialty, page, limit);
    return news || [];
  }

  @Get('searchIntelligent')
  @ApiOperation({ summary: 'Smart search using Elasticsearch (phrase + most fields)' })
  async smartSearch(@Query('text') texto: string): Promise<NewsCardDto[]> {
    if (!texto || texto.trim().length === 0) {
      throw new BadRequestException('El texto de búsqueda no puede estar vacío.');
    }
  
    return this.findNewsService.searchIntelligent(texto);
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
  async getAllSummarized(): Promise<NewsTopDto[]> {
    return this.findNewsService.getAllSummarized();
  }

  @Get('recommendations/:userId')
  @ApiOperation({ summary: 'Get personalized news recommendations for a user' })
  async getPersonalizedRecommendations(
    @Param('userId') userId: string,
  ): Promise<NewsCardDto[]> {
    try {
      return await this.findRecommendationsNewsService.getPersonalizedNews(userId);
    } catch (error) {
      console.error('❌ Error al obtener recomendaciones personalizadas:', error.message);
      throw new HttpException(
        'El servicio de recomendaciones no está disponible en este momento. Por favor, intenta más tarde.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }


  

}
