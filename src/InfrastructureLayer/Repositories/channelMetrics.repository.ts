import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelMetricsEntity } from '../../DomainLayer/Entities/channelMetrics.entity';
import { IChannelMetricsRepository } from './Interface/channelMetrics.repository.interface';

@Injectable()
export class ChannelMetricsRepository implements IChannelMetricsRepository {
  constructor(
    @InjectRepository(ChannelMetricsEntity)
    private readonly metricsRepo: Repository<ChannelMetricsEntity>,
  ) {}

  async findAll(): Promise<ChannelMetricsEntity[]> {
    return await this.metricsRepo.find({
      relations: ['Channel'],
    });
  }

  async findById(MetricID: string): Promise<ChannelMetricsEntity | undefined> {
    return await this.metricsRepo.findOne({
      where: { MetricID },
      relations: ['Channel'],
    });
  }

  async create(metrics: Partial<ChannelMetricsEntity>): Promise<ChannelMetricsEntity> {
    const newMetric = this.metricsRepo.create(metrics);
    return await this.metricsRepo.save(newMetric);
  }

  async findByChannelId(ChannelID: string): Promise<ChannelMetricsEntity[]> {
    return await this.metricsRepo.find({
      where: { Channel: { ChannelID } },
      relations: ['Channel'],
      order: { AnalysisDate: 'DESC' },
    });
  }

    async update(MetricID: string, updateData: Partial<ChannelMetricsEntity>): Promise<void> {
    await this.metricsRepo.update(MetricID, updateData);
  }
}
