import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEntity } from '../DomainLayer/Entities/channel.entity';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';
import { ChannelController } from 'src/InterfaceAdaptersLayer/Controllers/ channel.controller';
import { CreateChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/create.channel';
import { FindChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/find.channel';
import { UpdateChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/update.channel';
import { JournalistModule } from './journalist.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelEntity]),
    JournalistModule, 
  ],
  controllers: [ChannelController],
  providers: [UpdateChannelService,CreateChannelService,FindChannelService, ChannelRepository],
  exports: [UpdateChannelService,CreateChannelService,FindChannelService, ChannelRepository],
})
export class ChannelModule {}
