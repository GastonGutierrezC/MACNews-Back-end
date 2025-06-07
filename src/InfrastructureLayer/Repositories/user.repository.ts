import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../DomainLayer/Entities/user.entity';
import { IUserRepository } from './Interface/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}


  async findAll(): Promise<UserEntity[]> { 
    return await this.userRepo.find({ relations: ['journalist'] });
  }

  async findById(UserID: string): Promise<UserEntity | null> {
    return await this.userRepo.findOne({ 
      where: { UserID },
      relations: ['journalist'],
    });
  }
  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.userRepo.create(user);
    return await this.userRepo.save(newUser);
  }

    async update(id: string, updateData: Partial<UserEntity>): Promise<UserEntity> {
      await this.userRepo.update(id, updateData);
      return await this.findById(id); 
    }
  
}
