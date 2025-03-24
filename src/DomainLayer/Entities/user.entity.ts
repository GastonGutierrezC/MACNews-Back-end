


import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { PasswordEntity } from './pasword.entity';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') 
  UserID: string;

  @Column()
  UserFirstName: string;

  @Column()
  UserLastName: string;

  @Column({ unique: true })
  UserEmail: string;

  @Column({ nullable: true })
  UserImageURL: string;

  @Column({ type: 'boolean', default: true })
  IsActive: boolean;  

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  RegistrationDate: string; 

  // Relación de uno a uno con la entidad Password


  @OneToOne(() => PasswordEntity, (password) => password.user)
  @JoinColumn({ name: 'UserID' })
  password: PasswordEntity;
}
