import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';


@Injectable()
export class FindApplicationFormService {
  constructor(
    private readonly applicationFormRepository: ApplicationFormRepository,
  ) {}

  async findById( applicationFormID: string): Promise<ApplicationFormEntity> {
    const applicationForm = await this.applicationFormRepository.findById(applicationFormID);
    if (!applicationForm) {
      throw new NotFoundException(`applicationForm with ID ${applicationFormID} not found.`);
    }
    return applicationForm;
  }

  async findByUserId(UserID: string): Promise<ApplicationFormEntity> {
    const allApplicationForms = await this.applicationFormRepository.findAll();
    const applicationForm = allApplicationForms.find(form => form.User?.UserID === UserID);

    if (!applicationForm) {
      throw new NotFoundException(`ApplicationForm with UserID ${UserID} not found.`);
    }

    return applicationForm;
  }

}


