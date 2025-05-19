
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchHistoryController } from '../InterfaceAdaptersLayer/Controllers/searchHistory.controller';
import { UserModule } from './user.module';
import { SearchHistoryRepository } from 'src/InfrastructureLayer/Repositories/searchHistory.repository';
import { CreateSearchHistoryService } from 'src/ApplicationLayer/UseCases/SearchHistoryUseCases/create.searchHistory';
import { FindSearchHistoryService } from 'src/ApplicationLayer/UseCases/SearchHistoryUseCases/find.searchHistory';
import { SearchHistoryEntity } from 'src/DomainLayer/Entities/SearchHistory.entity';
import { PersonalizedRecommendationsAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/PersonalizedRecommendations.IntellidentsAgents';

@Module({
  imports: [
    TypeOrmModule.forFeature([SearchHistoryEntity]),
    UserModule, 
  ],
  controllers: [SearchHistoryController],
  providers: [
    PersonalizedRecommendationsAgent,
    CreateSearchHistoryService,
    FindSearchHistoryService,
    SearchHistoryRepository,
  ],
  exports: [
    PersonalizedRecommendationsAgent,
    CreateSearchHistoryService,
    FindSearchHistoryService,
    SearchHistoryRepository,
  ],
})
export class SearchHistoryModule {}


