import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'UserRecommendations' })
export class UserRecommendationsEntity {
  @PrimaryGeneratedColumn('uuid')
  RecommendationID: string;

  @Column('uuid')
  UserID: string;

  @Column({ type: 'json' })
  NewsArticleIDs: string[]; // UUIDs como strings

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  GeneratedAt: Date;

  @Column({ type: 'boolean', default: true })
  IsActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.recommendations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: UserEntity;
}
