import { ChannelMetricsEntity } from 'src/DomainLayer/Entities/channelMetrics.entity';

export interface IChannelMetricsRepository {
  findAll(): Promise<ChannelMetricsEntity[]>;
  findById(MetricID: string): Promise<ChannelMetricsEntity | undefined>;
  create(metrics: Partial<ChannelMetricsEntity>): Promise<ChannelMetricsEntity>;
  findByChannelId(ChannelID: string): Promise<ChannelMetricsEntity[]>;
  update(MetricID: string, updateData: Partial<ChannelMetricsEntity>): Promise<void>;
}
