import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { NewsEntity } from './news.entity';
import { JournalistEntity } from './journalist.entity';
import { FollowChannelEntity } from './followChannel.entity';
import { ChannelMetricsEntity } from './channelMetrics.entity';

export enum ChannelSpecialties {
    Investigative = 'Investigative',
    Interview = 'Interview',
    Opinion = 'Opinion',
    Interpretive = 'Interpretive',
    Data = 'Data',
    Social = 'Social',
    Political = 'Political',
    Scientific = 'Scientific',
    Entertainment = 'Entertainment',
    Business = 'Business'
}

@Entity('Channel')
export class ChannelEntity {
  @PrimaryGeneratedColumn('uuid')
  ChannelID: string;

  @OneToOne(() => JournalistEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'JournalistID' })
  Journalist: JournalistEntity;

  @Column({ type: 'varchar', length: 255 })
  ChannelName: string;

  @Column({ type: 'text' })
  DescriptionChannel: string;


  @Column({
    type: 'set',
    enum: ChannelSpecialties,
    enumName: 'channel_specialties',
    })
    Specialties: ChannelSpecialties[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  ChannelImageURL: string;

  @OneToMany(() => NewsEntity, (news) => news.Channel)
  News: NewsEntity[];

  @OneToMany(() => FollowChannelEntity, (follow) => follow.Channel)
  followers: FollowChannelEntity[];

  @OneToMany(() => ChannelMetricsEntity, (metric) => metric.Channel)
Metrics: ChannelMetricsEntity[];

}
