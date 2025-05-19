
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
    {
      provide: 'ISearchHistoryRepository',
      useClass: SearchHistoryRepository,
    },
    {
      provide: 'IPersonalizedRecommendationsAgent',
      useClass: PersonalizedRecommendationsAgent,
    },
    CreateSearchHistoryService,
    FindSearchHistoryService,

  ],
  exports: [
    {
      provide: 'ISearchHistoryRepository',
      useClass: SearchHistoryRepository,
    },
    {
      provide: 'IPersonalizedRecommendationsAgent',
      useClass: PersonalizedRecommendationsAgent,
    },
    CreateSearchHistoryService,
    FindSearchHistoryService,
  ],
})
export class SearchHistoryModule {}


