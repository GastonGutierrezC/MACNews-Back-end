import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('SearchHistory')
export class SearchHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  SearchHistoryID: string;

  @Column()
  SearchWord: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  SearchDate: Date;
  

  @ManyToOne(() => UserEntity, user => user.searchHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  User: UserEntity;
}
