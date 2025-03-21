


import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserType {
  Reader = 'Reader',
  Journalist = 'Journalist',
  Administrator = 'Administrator',
}

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

  @Column()
  UserPassword: string;

  @Column({ nullable: true })
  UserImageURL: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.Reader })

  UserType: UserType;
}
