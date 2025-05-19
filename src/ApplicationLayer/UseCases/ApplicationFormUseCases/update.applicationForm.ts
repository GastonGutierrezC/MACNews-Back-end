import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { UpdateApplicationFormVerificationDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm-Verification.dto';
import { UpdateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm.dto';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
import { IApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/Interface/applicationForm.repository.interface';


@Injectable()
export class UpdateApplicationFormService {
  constructor(
    @Inject('IApplicationFormRepository')
    private readonly applicationFormRepository: IApplicationFormRepository,
    
  ) {}

  async update(applicationFormID: string, updateApplicationFormDto: UpdateApplicationFormDto): Promise<ApplicationFormEntity> {
    const applicationForm = await this.applicationFormRepository.findById(applicationFormID);
    if (!applicationForm) {
      throw new NotFoundException(`applicationForm with ID ${applicationFormID} not found.`);
    }

    await this.applicationFormRepository.update(applicationFormID, updateApplicationFormDto);
    return { ...applicationForm, ...updateApplicationFormDto };
  }

   async updateJournalistVerification(applicationFormID: string, updateApplicationFormDto: UpdateApplicationFormVerificationDto): Promise<ApplicationFormEntity> {
    const applicationForm = await this.applicationFormRepository.findById(applicationFormID);
    if (!applicationForm) {
      throw new NotFoundException(`applicationForm with ID ${applicationFormID} not found.`);
    }
    
      applicationForm.VerificationStatus = updateApplicationFormDto.VerificationStatus;

      await this.applicationFormRepository.update(applicationFormID, updateApplicationFormDto);
      return { ...applicationForm, ...updateApplicationFormDto };
  }


}