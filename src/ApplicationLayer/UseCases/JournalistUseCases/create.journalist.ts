import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/create-journalist.dto';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';


@Injectable()
export class CreateJournalistService {
  constructor(
    private readonly applicationFormRepository: ApplicationFormRepository,
    private readonly journalistRepository : JournalistRepository,

  ) {}

  async create(createJournalistDto: CreateJournalistDto): Promise<JournalistEntity> {
    const applicationForm = await this.applicationFormRepository.findById(createJournalistDto.ApplicationFormID);
    if (!applicationForm) {
      throw new NotFoundException('applicationForm not found.');
    }

    if (applicationForm.VerificationStatus !== 'Approved') {
        throw new BadRequestException('Application form must be approved to create a journalist.');
      }

    const allJournalist = await this.journalistRepository.findAll();
    const existingJournalist = allJournalist.find(journalist => journalist.ApplicationForm?.ApplicationFormID === createJournalistDto.ApplicationFormID);
    
    if (existingJournalist) {
      throw new BadRequestException('User already has an application form.');
    }

    const journalist = await this.journalistRepository.create({
      ...createJournalistDto,
      ApplicationForm: applicationForm,
    });

    return journalist;
  }
}

