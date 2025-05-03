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
import { PersonalizedRecommendationsAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/PersonalizedRecommendations.IntellidentsAgents';
import { VisitsModule } from './visits.module'; // <-- Asegurate de que este módulo exporta FindVisitsService

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),  
    ChannelModule, 
    forwardRef(() => VisitsModule), // ✅ también aquí
  ],
  controllers: [NewsController],  
  providers: [
    FindRecommendationsNewsService,
    CreateNewsService,
    FindNewsService,
    UpdateNewsService,
    NewsRepository,
    PersonalizedRecommendationsAgent,
    NewsReviewIntelligentAgent,
  ],  
  exports: [
    FindRecommendationsNewsService,
    CreateNewsService,
    FindNewsService,
    UpdateNewsService,
    NewsRepository,
    PersonalizedRecommendationsAgent,
  ], 
})
export class NewsModule {}

