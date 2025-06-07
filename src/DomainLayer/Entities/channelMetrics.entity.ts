import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ChannelEntity } from './channel.entity';

@Entity('ChannelMetrics')
export class ChannelMetricsEntity {
  @PrimaryGeneratedColumn('uuid')
  MetricID: string;

  @ManyToOne(() => ChannelEntity, (channel) => channel.Metrics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ChannelID' })
  Channel: ChannelEntity;

  @Column({ type: 'json' })
  TopInterests: { interest: string; percentage: number }[];

  @Column({ type: 'text' })
  Observation: string;

  @CreateDateColumn({ type: 'datetime', name: 'AnalysisDate' })
  AnalysisDate: Date;
}
