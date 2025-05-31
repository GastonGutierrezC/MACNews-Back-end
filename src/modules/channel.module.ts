import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEntity } from '../DomainLayer/Entities/channel.entity';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';
import { ChannelController } from 'src/InterfaceAdaptersLayer/Controllers/ channel.controller';
import { CreateChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/create.channel';
import { FindChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/find.channel';
import { UpdateChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/update.channel';
import { JournalistModule } from './journalist.module';
import { FollowChannelModule } from './followChannel.module';
import { NewsModule } from './news.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelEntity]),
    JournalistModule, 
  
    forwardRef(() => FollowChannelModule),
    forwardRef(() => NewsModule),
  ],
  controllers: [ChannelController],
  providers: [
    {
      provide: 'IChannelRepository',
      useClass: ChannelRepository,
    },    
    UpdateChannelService,CreateChannelService,FindChannelService],
  exports: [
    {
      provide: 'IChannelRepository',
      useClass: ChannelRepository,
    }, 
    UpdateChannelService,CreateChannelService,FindChannelService],
})
export class ChannelModule {}
