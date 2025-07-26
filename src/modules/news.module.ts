import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../DomainLayer/Entities/news.entity';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { NewsController } from 'src/InterfaceAdaptersLayer/Controllers/news.controller';
import { ChannelModule } from './channel.module'; 
import { CreateNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/create.news';
import { FindNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/find.news';
import { UpdateNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/update.news';
import { NewsReviewIntelligentAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/NewsReview.IntelligentAgent';
import { FindRecommendationsNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/findRecomendations.news';
import { VisitsModule } from './visits.module'; // <-- Asegurate de que este módulo exporta FindVisitsService
import { ElasticsearchService } from 'src/InfrastructureLayer/ElasticsearchConnection/ElasticsearchService';
import { RecommendationModule } from './recommendation.module';
import { NewsUpdateIntelligentAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/NewsUpdate.intelligentAgent';
import { NewsUpdateIntelligent } from 'src/ApplicationLayer/UseCases/NewsUseCases/NewsUpdateIntelligent';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),  
    
    RecommendationModule,
    forwardRef(() => ChannelModule),
    forwardRef(() => VisitsModule), // ✅ también aquí
  ],
  controllers: [NewsController],  
  providers: [
    {
      provide: 'INewsRepository',
      useClass: NewsRepository,
    },
    {
      provide: 'INewsReviewIntelligentAgent',
      useClass: NewsReviewIntelligentAgent,
    },
    {
      provide: 'INewsUpdateIntelligentAgent',
      useClass: NewsUpdateIntelligentAgent,
    },
    {
      provide: 'IElasticsearchService',
      useClass: ElasticsearchService,
    },

    FindRecommendationsNewsService,
    CreateNewsService,
    FindNewsService,
    UpdateNewsService,
    NewsUpdateIntelligent

  ],  
  exports: [
    {
      provide: 'INewsRepository',
      useClass: NewsRepository,
    },
    {
      provide: 'INewsReviewIntelligentAgent',
      useClass: NewsReviewIntelligentAgent,
    },
    {
      provide: 'IElasticsearchService',
      useClass: ElasticsearchService,
    },
        {
      provide: 'INewsUpdateIntelligentAgent',
      useClass: NewsUpdateIntelligentAgent,
    },
    FindRecommendationsNewsService,
    CreateNewsService,
    FindNewsService,
    UpdateNewsService,
    NewsUpdateIntelligent


  ], 
})
export class NewsModule {}

