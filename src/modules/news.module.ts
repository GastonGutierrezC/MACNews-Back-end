import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../DomainLayer/Entities/news.entity';
import { NewsService } from 'src/ApplicationLayer/UseCases/news.service';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { NewsController } from 'src/InterfaceAdaptersLayer/Controllers/news.controller';
import { ChannelModule } from './channel.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),  
    ChannelModule, 
  ],
  controllers: [NewsController],  
  providers: [NewsService, NewsRepository],  
  exports: [NewsService, NewsRepository], 
})
export class NewsModule {}

