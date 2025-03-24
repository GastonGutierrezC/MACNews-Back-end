import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';  // Ajusta la ruta según sea necesario

@Entity({ name: 'Passwords' })
export class PasswordEntity {
  @PrimaryGeneratedColumn('uuid')
  PasswordID: string;

  @Column({ type: 'uuid' })
  UserID: string;

  @Column({ type: 'varchar', length: 255 })
  PasswordUser: string; 

  @Column({ type: 'date', default: () => 'NOW()' })
  DateCreated: string;

  @Column({ type: 'date', default: () => 'NOW()' })
  DateLastChanged: string;

  @OneToOne(() => UserEntity, (user) => user.password, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: UserEntity;
}
