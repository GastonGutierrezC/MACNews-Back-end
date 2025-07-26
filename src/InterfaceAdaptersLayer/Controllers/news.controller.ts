import { Controller, Post, Body, Param, Patch, Delete, Get, NotFoundException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
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
import { NewsDetailDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-detail.dto';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';
import { ActiveUser } from 'src/ApplicationLayer/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/ApplicationLayer/decorators/active-user.interface';
import { UpdateNewsWithSuggestionsDto, UpdatedNewsResponseDto } from 'src/InfrastructureLayer/IntelligentAgentManagement/DTO.IntelligentAgent/NewsUpdate/UpdateNewsWithSuggestionsDto';
import { NewsUpdateIntelligent } from 'src/ApplicationLayer/UseCases/NewsUseCases/NewsUpdateIntelligent';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    private readonly createNewsService: CreateNewsService,
    private readonly findNewsService: FindNewsService,
    private readonly updateNewsService: UpdateNewsService,
    private readonly findRecommendationsNewsService: FindRecommendationsNewsService,
    private readonly newsUpdateIntelligent: NewsUpdateIntelligent,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create news' })
  @Auth(RoleAssigned.Journalist)
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: CreateNewsDto,
  })   
  async create(@Body() createNewsDto: CreateNewsDto): Promise<boolean> {
    return this.createNewsService.create(createNewsDto);
  }

  @Post('update-by-agent')
  @ApiOperation({ summary: 'Update news content using the intelligent agent' })
  @Auth(RoleAssigned.Journalist)
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: UpdateNewsWithSuggestionsDto,
  })
  async updateWithAgent(
    @Body() body: UpdateNewsWithSuggestionsDto,
  ): Promise<UpdatedNewsResponseDto> {
    return await this.newsUpdateIntelligent.execute(body);
  }

  @ApiOperation({ summary: 'update the news status' })
  @ApiBody({
    type: UpdateStatusNewsDto,
  })   
  @Patch(':id')
  async update(@Param('id') NewsId: string, @Body() updateNewsDto: UpdateStatusNewsDto): Promise<NewsEntity> {
    return this.updateNewsService.update(NewsId, updateNewsDto);
  }

  @Get('title/:title/date/:date')
  @ApiOperation({ summary: 'Get a single news by title and publication date' })
  async getByTitleAndDate(
    @Param('title') title: string,
    @Param('date') date: string, // formato esperado: YYYY-MM-DD
  ): Promise<NewsDetailDto> {
    return this.findNewsService.getByTitleAndDate(title, date);
  }
  



    @Get('channel/:channelId/category/:category')
  @ApiOperation({ summary: 'Get top 5 news by channel and category' })
  async getTop5ByChannelAndCategory(
    @Param('channelId') channelId: string,
    @Param('category') category: NewsCategory,
  ): Promise<NewsCardDto[]> {
    return this.findNewsService.getTop5ByChannelAndCategory(channelId, category);
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
    @Get('recommendations')

  @ApiOperation({ summary: 'Get personalized news recommendations for a user' })
  @Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  async getPersonalizedRecommendations(
   @ActiveUser() user: ActiveUserInterface,
  ): Promise<NewsCardDto[]> {
      return await this.findRecommendationsNewsService.getPersonalizedNews(user.userID);
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
  async getByChannel(@Param('channel') channelId: string): Promise<NewsCardDto[]> {
    return this.findNewsService.getByChannelId(channelId);
  }



  @Get()
  @ApiOperation({ summary: 'Get all news summarized (ID, Title, Category)' })
  async getAllSummarized(): Promise<NewsTopDto[]> {
    return this.findNewsService.getAllSummarized();
  }

@Get('metrics/categories')
@ApiOperation({ summary: 'Get total visits by category for the current journalist' })
@Auth(RoleAssigned.Journalist)
@ApiBearerAuth('access-token')
async getCategoryVisitMetrics(
  @ActiveUser() user: ActiveUserInterface,
): Promise<{ category: string, visitCount: number }[]> {
  return this.findNewsService.getCategoryVisitMetricsByUser(user.userID);
}



  
  

}
