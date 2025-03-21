import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findById(UserID: string): Promise<UserEntity | null> {
    return await this.userRepo.findOne({ where: { UserID } });
  }

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.userRepo.create(user);
    return await this.userRepo.save(newUser);
  }

  async update(id: string, updateData: Partial<UserEntity>): Promise<void> {
    await this.userRepo.update(id, updateData);
  }

  async findByEmailAndPassword(UserEmail: string, UserPassword: string): Promise<UserEntity | null> {
    return await this.userRepo.findOne({ where: { UserEmail, UserPassword } });
  }
}
