import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { UpdateApplicationFormVerificationDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm-Verification.dto';
import { UpdateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm.dto';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';


@Injectable()
export class CreateApplicationFormService {
  constructor(
    private readonly applicationFormRepository: ApplicationFormRepository,
    private readonly userRepository: UserRepository, // 🔹 Repositorio de usuarios
  ) {}

  async create(createApplicationFormDto: CreateApplicationFormDto): Promise<ApplicationFormEntity> {
    const user = await this.userRepository.findById(createApplicationFormDto.UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const allApplicationForms = await this.applicationFormRepository.findAll();
    const existingForm = allApplicationForms.find(form => form.User?.UserID === createApplicationFormDto.UserID);
    
    if (existingForm) {
      throw new BadRequestException('User already has an application form.');
    }

    const applicationForm = await this.applicationFormRepository.create({
      ...createApplicationFormDto,
      User: user,
    });

    return applicationForm;
  }
}

