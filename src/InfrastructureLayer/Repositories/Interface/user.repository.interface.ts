import { UserEntity } from 'src/DomainLayer/Entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  findById(UserID: string): Promise<UserEntity | null>;
  create(user: Partial<UserEntity>): Promise<UserEntity>;
  update(id: string, updateData: Partial<UserEntity>): Promise<UserEntity>;

}
