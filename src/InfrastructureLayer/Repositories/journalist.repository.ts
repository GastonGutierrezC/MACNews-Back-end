import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JournalistEntity } from '../../DomainLayer/Entities/journalist.entity';

@Injectable()
export class JournalistRepository {
  constructor(
    @InjectRepository(JournalistEntity)
    private readonly journalistRepo: Repository<JournalistEntity>,
  ) {}


  async findById(JournalistID: string): Promise<JournalistEntity | null> {
    return await this.journalistRepo.findOne({ where: { JournalistID }, relations: ['User'] });
  }


  async create(journalist: Partial<JournalistEntity>): Promise<JournalistEntity> {
    const newJournalist = this.journalistRepo.create(journalist);
    return await this.journalistRepo.save(newJournalist);
  }

  async update(JournalistID: string, updateData: Partial<JournalistEntity>): Promise<void> {
    await this.journalistRepo.update(JournalistID, updateData);
  }


  async findByUserId(UserID: string): Promise<JournalistEntity | null> {
    return await this.journalistRepo.findOne({
      where: { User: { UserID } },
      relations: ['User'],
    });
  }
}
