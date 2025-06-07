import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ChannelEntity } from './channel.entity';

@Entity({ name: 'CommentPost' })
export class CommentPostEntity {
  @PrimaryGeneratedColumn('uuid')
  CommentPostID: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'UserID' })
  User: UserEntity;

  @ManyToOne(() => ChannelEntity)
  @JoinColumn({ name: 'ChannelID' })
  Channel: ChannelEntity;

  @ManyToOne(() => CommentPostEntity, { nullable: true })
  @JoinColumn({ name: 'CommentParent' })
  ParentComment?: CommentPostEntity;

  @Column({ type: 'text' })
  TextComment: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  DateComment: Date;
}
