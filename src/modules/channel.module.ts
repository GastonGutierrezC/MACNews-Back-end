import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEntity } from '../dataLayer/entities/channel.entity';
import { ChannelService } from 'src/businessLayer/servies/channel.service';
import { ChannelRepository } from 'src/dataLayer/repositories/channel.repository';
import { ChannelController } from 'src/presentationLayer/ channel.controller';
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
