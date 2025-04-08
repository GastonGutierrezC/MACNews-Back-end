import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ChannelEntity } from './channel.entity';

export enum NewsStatus {
  Checking = 'Checking',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum NewsCategory {
  Politics = 'Politics',
  Economy = 'Economy',
  Sports = 'Sports',
  Entertainment = 'Entertainment',
  Technology = 'Technology',
  Health = 'Health',
  Science = 'Science',
  International = 'International',
  Society = 'Society',
  Security = 'Security'
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

  @Column({ type: 'enum', enum: NewsCategory })
  Categories: NewsCategory;

}
