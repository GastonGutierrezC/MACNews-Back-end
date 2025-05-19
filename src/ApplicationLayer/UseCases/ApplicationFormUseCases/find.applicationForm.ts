import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
import { IApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/Interface/applicationForm.repository.interface';


@Injectable()
export class FindApplicationFormService {
  constructor(
    @Inject('IApplicationFormRepository')
    private readonly applicationFormRepository: IApplicationFormRepository,
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


