import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationFormEntity } from '../../DomainLayer/Entities/applicationForm.entity';
import { IApplicationFormRepository } from './Interface/applicationForm.repository.interface';

@Injectable()
export class ApplicationFormRepository implements IApplicationFormRepository {
  constructor(
    @InjectRepository(ApplicationFormEntity)
    private readonly applicationFormRepo: Repository<ApplicationFormEntity>,
  ) {}

  async findAll(): Promise<ApplicationFormEntity[]> { 
    return await this.applicationFormRepo.find({ relations: ['User'] });
  }
  

    async findById(ApplicationFormID: string): Promise<ApplicationFormEntity | null> {
      return await this.applicationFormRepo.findOne({ where: { ApplicationFormID } });
    }

  async create(applicationForm: Partial<ApplicationFormEntity>): Promise<ApplicationFormEntity> {
    const newApplicationForm = this.applicationFormRepo.create(applicationForm);
    return await this.applicationFormRepo.save(newApplicationForm);
  }

  async update(applicationFormID: string, updateData: Partial<ApplicationFormEntity>): Promise<ApplicationFormEntity> {
    await this.applicationFormRepo.update(applicationFormID, updateData);
    return await this.findById(applicationFormID);
    }

}
