import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitsEntity } from '../../DomainLayer/Entities/visits.entity';
import { IVisitRepository } from './Interface/visits.repository.interface';

@Injectable()
export class VisitsRepository implements IVisitRepository {
  constructor(
    @InjectRepository(VisitsEntity)
    private readonly visitsRepo: Repository<VisitsEntity>,
  ) {}

  async findAll(): Promise<VisitsEntity[]> {
    return await this.visitsRepo.find({ relations: ['User', 'News'] });
  }

  async findById(VisitsID: string): Promise<VisitsEntity | null> {
    return await this.visitsRepo.findOne({ where: { VisitsID }, relations: ['User', 'News'] });
  }

  async create(visit: Partial<VisitsEntity>): Promise<VisitsEntity> {
    const newVisit = this.visitsRepo.create(visit);
    return await this.visitsRepo.save(newVisit);
  }

  async update(visitsID: string, updateData: Partial<VisitsEntity>): Promise<VisitsEntity> {
    await this.visitsRepo.update(visitsID, updateData);
    return await this.findById(visitsID);
  }
}
