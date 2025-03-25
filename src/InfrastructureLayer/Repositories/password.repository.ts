import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordEntity } from 'src/DomainLayer/Entities/pasword.entity';

@Injectable()
export class PasswordRepository {
  constructor(
    @InjectRepository(PasswordEntity)
    private readonly passwordRepo: Repository<PasswordEntity>,
  ) {}

  async findAll(): Promise<PasswordEntity[]> { 
    return await this.passwordRepo.find();
  }

  async findById(PasswordID: string): Promise<PasswordEntity | null> {
    return await this.passwordRepo.findOne({ where: { PasswordID } });
  }
  

  async create(user: Partial<PasswordEntity>): Promise<PasswordEntity> {
    const newUser = this.passwordRepo.create(user);
    return await this.passwordRepo.save(newUser);
  }

  async update(id: string, updateData: Partial<PasswordEntity>): Promise<PasswordEntity> {
    await this.passwordRepo.update(id, updateData);
    return await this.findById(id); 
  }
  
}
