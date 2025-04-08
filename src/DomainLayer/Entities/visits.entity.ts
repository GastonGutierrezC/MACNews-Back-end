import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NewsEntity } from './news.entity';
import { UserEntity } from './user.entity';


@Entity('Visits')
export class VisitsEntity {
  @PrimaryGeneratedColumn('uuid')
  VisitsID: string;

  @ManyToOne(() => UserEntity, (user) => user.UserID, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  User: UserEntity;

  @ManyToOne(() => NewsEntity, (news) => news.NewsId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'NewsID' })
  News: NewsEntity;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  DateVisit: Date;
}
