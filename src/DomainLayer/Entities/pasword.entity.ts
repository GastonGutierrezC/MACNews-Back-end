import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';  

@Entity({ name: 'Passwords' })
export class PasswordEntity {
  @PrimaryGeneratedColumn('uuid')
  PasswordID: string;

  @Column({ type: 'uuid' })
  UserID: string;

  @Column({ type: 'varchar', length: 255 })
  PasswordUser: string; 

  @Column({ type: 'datetime', default: () => 'NOW()' })
  DateCreated: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  DateLastChanged: string;

  @OneToOne(() => UserEntity, (user) => user.password, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: UserEntity;
}
