
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApplicationFormEntity } from './applicationForm.entity';

@Entity({ name: 'Journalist' })
export class JournalistEntity {
  @PrimaryGeneratedColumn('uuid') 
  JournalistID: string;

  @OneToOne(() => ApplicationFormEntity)  
  @JoinColumn({ name: 'ApplicationFormID' }) 
  ApplicationForm: ApplicationFormEntity;

  @Column({ type: 'text' })
  Specialty: string;

  @Column({ type: 'text' })
  JournalisticExperience: string;

  @Column({ type: 'boolean', default: true })
  IsActive: boolean;  

  @Column({ type: 'date', default: () => 'NOW()' })
  DateCreated: string; 


}
