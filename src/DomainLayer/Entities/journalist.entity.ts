
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApplicationFormEntity } from './applicationForm.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'Journalist' })
export class JournalistEntity {
  @PrimaryGeneratedColumn('uuid') 
  JournalistID: string;

  @OneToOne(() => UserEntity)  
  @JoinColumn({ name: 'UserID' }) 
  User: UserEntity;

  @Column({ type: 'text' })
  Specialty: string;

  @Column({ type: 'text' })
  JournalisticExperience: string;

  @Column({ type: 'boolean', default: true })
  IsActive: boolean;  

  @Column({ type: 'datetime', default: () => 'NOW()' })
  DateCreated: string; 


}
