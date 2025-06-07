import {
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { IChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/channel.repository.interface';
import { IChannelMetricsRepository } from 'src/InfrastructureLayer/Repositories/Interface/channelMetrics.repository.interface';
import { ChannelMetricsResponseDto } from 'src/ApplicationLayer/dto/ChannelMetricsDTOs/get-channel-metrics.dto';

@Injectable()
export class GetChannelMetricsService {
  constructor(
    @Inject('IChannelRepository')
    private readonly channelRepository: IChannelRepository,

    @Inject('IChannelMetricsRepository')
    private readonly metricsRepository: IChannelMetricsRepository,
  ) {}

  async getByChannelId(channelId: string): Promise<ChannelMetricsResponseDto[]> {
    const channel = await this.channelRepository.findById(channelId);
    if (!channel) {
      throw new NotFoundException('Channel not found.');
    }

    const metrics = await this.metricsRepository.findByChannelId(channelId);

    return metrics.map((metric) => ({
      MetricID: metric.MetricID,
      ChannelID: metric.Channel.ChannelID,
      TopInterests: metric.TopInterests,
      Observation: metric.Observation,
      AnalysisDate: metric.AnalysisDate,
    }));
  }
}
