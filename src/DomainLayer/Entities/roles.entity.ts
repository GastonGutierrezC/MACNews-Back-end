import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';


export enum RoleAssigned {
    Reader = 'Reader',
    Administrator = 'Administrator',
    Journalist = 'Journalist'
  }

@Entity({ name: 'Roles' })
export class RolesEntity {
  @PrimaryGeneratedColumn('uuid')
  RolID: string;

  @Column({ type: 'uuid' })
  UserID: string;

  @Column({ type: 'enum', enum: RoleAssigned, default: RoleAssigned.Reader })  
  RoleAssigned:RoleAssigned;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  DateAssigned: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  LastChangeDate: string;

  @OneToOne(() => UserEntity, (user) => user.roles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: UserEntity;
}