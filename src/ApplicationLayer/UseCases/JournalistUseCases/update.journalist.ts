import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { UpdateApplicationFormVerificationDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm-Verification.dto';
import { UpdateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/update-applicationForm.dto';
import { UpdateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/update-journalist.dto';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';


@Injectable()
export class UpdateJournalistService {
  constructor(
    private readonly journalistRepository : JournalistRepository,
  ) {}



  async update(journalistID: string, updateJournalistDto: UpdateJournalistDto): Promise<JournalistEntity> {
    const journalist = await this.journalistRepository.findById(journalistID);
    if (!journalist) {
      throw new NotFoundException(`applicationForm with ID ${journalistID} not found.`);
    }

    await this.journalistRepository.update(journalistID, updateJournalistDto);
    return { ...journalist, ...updateJournalistDto };
  }



}