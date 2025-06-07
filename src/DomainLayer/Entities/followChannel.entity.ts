import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ChannelEntity } from './channel.entity';
import { UserEntity } from './user.entity';


@Entity('FollowChannel')
export class FollowChannelEntity {
  @PrimaryGeneratedColumn('uuid')
  FollowChannelID: string;

  @ManyToOne(() => UserEntity, (user) => user.followedChannels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  User: UserEntity;

  @ManyToOne(() => ChannelEntity, (channel) => channel.followers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ChannelID' })
  Channel: ChannelEntity;

  @Column({ type: 'boolean', default: true })
  IsFollow: boolean;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  FollowDate: Date;
}
