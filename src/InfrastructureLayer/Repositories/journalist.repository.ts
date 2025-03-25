import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordEntity } from 'src/DomainLayer/Entities/pasword.entity';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';

@Injectable()
export class JournalistRepository {
  constructor(
    @InjectRepository(JournalistEntity)
    private readonly journalistRepo: Repository<JournalistEntity>,
  ) {}



    async findAll(): Promise<JournalistEntity[]> { 
      return await this.journalistRepo.find({ relations: ['ApplicationForm'] });
    }

  async findById(JournalistID: string): Promise<JournalistEntity | null> {
    return await this.journalistRepo.findOne({ where: { JournalistID } });
  }
  
  async create(user: Partial<JournalistEntity>): Promise<JournalistEntity> {
    const newUser = this.journalistRepo.create(user);
    return await this.journalistRepo.save(newUser);
  }

  async update(id: string, updateData: Partial<JournalistEntity>): Promise<JournalistEntity> {
    await this.journalistRepo.update(id, updateData);
    return await this.findById(id); 
  }
  
}
