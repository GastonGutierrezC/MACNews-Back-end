import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { NewsEntity } from './news.entity';
import { JournalistEntity } from './journalist.entity';
import { FollowChannelEntity } from './followChannel.entity';

export enum ChannelCategory {
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

  @Column({ type: 'enum', enum: ChannelCategory })
  Categories: ChannelCategory;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ChannelImageURL: string;

  @OneToMany(() => NewsEntity, (news) => news.Channel)
  News: NewsEntity[];

  @OneToMany(() => FollowChannelEntity, (follow) => follow.Channel)
  followers: FollowChannelEntity[];
}
