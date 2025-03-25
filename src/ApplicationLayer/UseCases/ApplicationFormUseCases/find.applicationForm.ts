import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { UpdateApplicationFormVerificationDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm-Verification.dto';
import { UpdateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm.dto';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';


@Injectable()
export class FindApplicationFormService {
  constructor(
    private readonly applicationFormRepository: ApplicationFormRepository,
    private readonly userRepository: UserRepository, // 🔹 Repositorio de usuarios
  ) {}

  async findById( applicationFormID: string): Promise<ApplicationFormEntity> {
    const applicationForm = await this.applicationFormRepository.findById(applicationFormID);
    if (!applicationForm) {
      throw new NotFoundException(`applicationForm with ID ${applicationFormID} not found.`);
    }
    return applicationForm;
  }

  async findByUserId(UserID: string): Promise<ApplicationFormEntity> {
    // 🔹 Obtener todos los formularios y filtrar por UserID
    const allApplicationForms = await this.applicationFormRepository.findAll();
    const applicationForm = allApplicationForms.find(form => form.User?.UserID === UserID);

    if (!applicationForm) {
      throw new NotFoundException(`ApplicationForm with UserID ${UserID} not found.`);
    }

    return applicationForm;
  }

}


