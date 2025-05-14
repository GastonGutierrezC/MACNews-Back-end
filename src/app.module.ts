import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module'; 
import { UserEntity } from './DomainLayer/Entities/user.entity';
import { ApplicationFormEntity } from './DomainLayer/Entities/applicationForm.entity';
import { ChannelEntity } from './DomainLayer/Entities/channel.entity';
import { ChannelModule } from './modules/channel.module';
import { NewsEntity } from './DomainLayer/Entities/news.entity';
import { NewsModule } from './modules/news.module';
import { PasswordEntity } from './DomainLayer/Entities/pasword.entity';
import { RolesEntity } from './DomainLayer/Entities/roles.entity';
import { ApplicationFormModule } from './modules/applicationForm.module';
import { JournalistEntity } from './DomainLayer/Entities/journalist.entity';
import { JournalistModule } from './modules/journalist.module';
import { FollowChannelEntity } from './DomainLayer/Entities/followChannel.entity';
import { FollowChannelModule } from './modules/followChannel.module';
import { CommentPostEntity } from './DomainLayer/Entities/commentPost.entity';
import { CommentPostModule } from './modules/commentPost.module';
import { SearchHistoryEntity } from './DomainLayer/Entities/SearchHistory.entity';
import { SearchHistoryModule } from './modules/searchHistory.module';
import { VisitsEntity } from './DomainLayer/Entities/visits.entity';
import { VisitsModule } from './modules/visits.module';
import { UserRecommendationsEntity } from './DomainLayer/Entities/userRecommendations.entity';
import { RecommendationModule } from './modules/recommendation.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'gaston',
      password: 'gaston',
      database: 'MACNews',
      entities: [UserRecommendationsEntity,VisitsEntity,SearchHistoryEntity,CommentPostEntity,FollowChannelEntity,JournalistEntity,UserEntity,ApplicationFormEntity,ChannelEntity,NewsEntity,PasswordEntity,RolesEntity],
      synchronize: false, 
    }),
    UserModule,
    ApplicationFormModule,
    ChannelModule,
    NewsModule,
    JournalistModule,
    FollowChannelModule,
    CommentPostModule,
    SearchHistoryModule,
    VisitsModule,
    RecommendationModule,
  ],
})
export class AppModule {}
