import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMetricsEntity } from '../DomainLayer/Entities/channelMetrics.entity';
import { ChannelMetricsRepository } from 'src/InfrastructureLayer/Repositories/channelMetrics.repository';
import { CreateChannelMetricsService } from 'src/ApplicationLayer/UseCases/ChannelMetricsUseCases/create-channel-metrics.service';
import { UpdateChannelMetricsService } from 'src/ApplicationLayer/UseCases/ChannelMetricsUseCases/update-channel-metrics.service';
import { FindChannelMetricsService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/findMetricts.commentPost';
import { ChannelMetricsController } from 'src/InterfaceAdaptersLayer/Controllers/channel-metrics.controller';
import { ChannelModule } from './channel.module';
import { GetChannelMetricsService } from 'src/ApplicationLayer/UseCases/ChannelMetricsUseCases/get-channel-metrics.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelMetricsEntity]),
    forwardRef(() => ChannelModule),
  ],
  controllers: [ChannelMetricsController],
  providers: [
    {
      provide: 'IChannelMetricsRepository',
      useClass: ChannelMetricsRepository,
    },
    CreateChannelMetricsService,
    GetChannelMetricsService,
    UpdateChannelMetricsService,
  ],
  exports: [
    {
      provide: 'IChannelMetricsRepository',
      useClass: ChannelMetricsRepository,
    },
    CreateChannelMetricsService,
    GetChannelMetricsService,
    UpdateChannelMetricsService,
  ],
})
export class ChannelMetricsModule {}
