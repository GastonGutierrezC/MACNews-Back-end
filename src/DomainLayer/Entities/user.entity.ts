
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { PasswordEntity } from './pasword.entity';
import { RolesEntity } from './roles.entity';
import { FollowChannelEntity } from './followChannel.entity';
import { SearchHistoryEntity } from './SearchHistory.entity';
import { UserRecommendationsEntity } from './userRecommendations.entity';
import { JournalistEntity } from './journalist.entity';

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

  @Column({ type: 'datetime', default: () => 'NOW()' })
  RegistrationDate: string; 

  @OneToOne(() => PasswordEntity, (password) => password.user)
  @JoinColumn({ name: 'UserID' })
  password: PasswordEntity;

  @OneToOne(() => RolesEntity, (roles) => roles.user)
  @JoinColumn({ name: 'UserID' })
  roles: RolesEntity;

  @OneToMany(() => FollowChannelEntity, (follow) => follow.User)
  followedChannels: FollowChannelEntity[];


  @OneToMany(() => SearchHistoryEntity, (search) => search.User) 
  searchHistory: SearchHistoryEntity[];

  @OneToMany(() => UserRecommendationsEntity, (recommendation) => recommendation.user)
recommendations: UserRecommendationsEntity[];

@OneToOne(() => JournalistEntity, (journalist) => journalist.User)
journalist: JournalistEntity;


}
