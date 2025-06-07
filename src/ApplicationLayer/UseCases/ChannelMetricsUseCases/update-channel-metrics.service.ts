import {
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { UpdateChannelMetricsDto } from 'src/ApplicationLayer/dto/ChannelMetricsDTOs/update-channel-metrics.dto';
import { ResponseUpdateChannelMetricsDto } from 'src/ApplicationLayer/dto/ChannelMetricsDTOs/response-update-channel-metrics.dto';
import { IChannelMetricsRepository } from 'src/InfrastructureLayer/Repositories/Interface/channelMetrics.repository.interface';
import { IChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/channel.repository.interface';

@Injectable()
export class UpdateChannelMetricsService {
  constructor(
    @Inject('IChannelMetricsRepository')
    private readonly metricsRepository: IChannelMetricsRepository,

    @Inject('IChannelRepository')
    private readonly channelRepository: IChannelRepository,
  ) {}

  async update(updateDto: UpdateChannelMetricsDto): Promise<ResponseUpdateChannelMetricsDto> {
    const channel = await this.channelRepository.findById(updateDto.ChannelID);
    if (!channel) {
      throw new NotFoundException('Channel not found.');
    }

    const metrics = await this.metricsRepository.findByChannelId(updateDto.ChannelID);

    if (!metrics || metrics.length === 0) {
      throw new NotFoundException('Metrics not found for this channel.');
    }

    for (const metric of metrics) {
      await this.metricsRepository.update(metric.MetricID, {
        TopInterests: updateDto.TopInterests,
        Observation: updateDto.Observation,
      });
    }

    // Construir el DTO de respuesta
    const responseDto = new ResponseUpdateChannelMetricsDto();
    responseDto.TopInterests = updateDto.TopInterests;
    responseDto.Observation = updateDto.Observation;

    return responseDto;
  }
}
