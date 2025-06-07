import {
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateChannelMetricsDto } from 'src/ApplicationLayer/dto/ChannelMetricsDTOs/create-channel-metrics.dto';
import { ChannelMetricsEntity } from 'src/DomainLayer/Entities/channelMetrics.entity';
import { IChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/channel.repository.interface';
import { IChannelMetricsRepository } from 'src/InfrastructureLayer/Repositories/Interface/channelMetrics.repository.interface';

@Injectable()
export class CreateChannelMetricsService {
  constructor(
    @Inject('IChannelRepository')
    private readonly channelRepository: IChannelRepository,

    @Inject('IChannelMetricsRepository')
    private readonly metricsRepository: IChannelMetricsRepository,
  ) {}

  async create(dto: CreateChannelMetricsDto): Promise<ChannelMetricsEntity> {
    const channel = await this.channelRepository.findById(dto.ChannelID);

    const metric = await this.metricsRepository.create({
      Channel: channel,
      TopInterests: dto.top_interests,
      Observation: dto.observation,
    });

    return metric;
  }
}
