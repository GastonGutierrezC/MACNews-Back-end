import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ChannelEntity } from './channel.entity';

export enum NewsStatus {
  Checking = 'Checking',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

@Entity('News')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  NewsId: string;

  @ManyToOne(() => ChannelEntity, (channel) => channel.News, { eager: true })
  @JoinColumn({ name: 'ChannelID' })
  Channel: ChannelEntity;

  @Column()
  Title: string;

  @Column('text')
  Content: string;

  @Column('date')
  PublicationDate: string;

  @Column({
    type: 'enum',
    enum: NewsStatus,
    default: NewsStatus.Checking,
  })
  NewsStatus: NewsStatus;

  @Column({ type: 'varchar', nullable: true })
  NewsImageURL: string;

  @Column({ type: 'int', default: 0 })
  NumberOfViews: number;
}
