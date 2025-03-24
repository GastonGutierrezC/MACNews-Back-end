import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity'; 

export enum VerificationStatus {
    Checking = 'Checking',
    Approved = 'Approved',
    Rejected = 'Rejected',
  }

@Entity('Journalist')
export class JournalistEntity {
  @PrimaryGeneratedColumn('uuid')
  JournalistID: string;

  @OneToOne(() => UserEntity)  
  @JoinColumn({ name: 'UserID' }) 
  User: UserEntity;

  @Column({ type: 'date' })
  BirthDate: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  CardNumber: string;

  @Column({ type: 'text' })
  Reason: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ImageCertificateURL: string;

  @Column({ type: 'enum', enum: VerificationStatus, default: VerificationStatus.Checking })
  
  VerificationStatus:VerificationStatus;
}


