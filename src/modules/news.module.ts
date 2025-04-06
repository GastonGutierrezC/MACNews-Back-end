import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../DomainLayer/Entities/news.entity';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { NewsController } from 'src/InterfaceAdaptersLayer/Controllers/news.controller';
import { ChannelModule } from './channel.module'; 
import { CreateNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/create.news';
import { FindNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/find.news';
import { UpdateNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/update.news';
import { NewsReviewIntelligentAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/NewsReview.IntelligentAgent';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),  
    ChannelModule, 
  ],
  controllers: [NewsController],  
  providers: [
    CreateNewsService,
    FindNewsService,
    UpdateNewsService,
    NewsRepository,
    NewsReviewIntelligentAgent,
  ],  
  exports: [
    CreateNewsService,
    FindNewsService,
    UpdateNewsService,
    NewsRepository,
  ], 
})
export class NewsModule {}

