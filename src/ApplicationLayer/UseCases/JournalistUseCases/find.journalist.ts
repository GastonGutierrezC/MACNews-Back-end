import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { UpdateApplicationFormVerificationDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm-Verification.dto';
import { UpdateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm.dto';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';


@Injectable()
export class FindJournalistService {
  constructor(
    private readonly journalistRepository : JournalistRepository,
    
  ) {}

  async findById( JournalistID: string): Promise<JournalistEntity> {
    const journalist = await this.journalistRepository.findById(JournalistID);
    if (!journalist) {
      throw new NotFoundException(`applicationForm with ID ${JournalistID} not found.`);
    }
    return journalist;
  }

}
