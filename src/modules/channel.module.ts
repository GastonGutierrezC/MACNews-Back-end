import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEntity } from '../DomainLayer/Entities/channel.entity';
import { ChannelService } from 'src/ApplicationLayer/UseCases/channel.service';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';
import { ChannelController } from 'src/InterfaceAdaptersLayer/Controllers/ channel.controller';
import { JournalistModule } from './jounrnalist.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelEntity]),
    JournalistModule, 
  ],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelRepository],
  exports: [ChannelService, ChannelRepository],
})
export class ChannelModule {}
