import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/create-journalist.dto';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';


@Injectable()
export class CreateJournalistService {
  constructor(
    private readonly applicationFormRepository: ApplicationFormRepository,
    private readonly journalistRepository : JournalistRepository,
    private readonly userRepository : UserRepository,

  ) {}

  async create(createJournalistDto: CreateJournalistDto): Promise<JournalistEntity> {

    const user = await this.userRepository.findById(createJournalistDto.UserID);
    if (!user) {
        throw new NotFoundException(`User with ID ${createJournalistDto.UserID} not found.`);
    }

    const allApplicationForms = await this.applicationFormRepository.findAll();
    const applicationForm = allApplicationForms.find(form => form.User.UserID === createJournalistDto.UserID);
    
    if (!applicationForm) {
        throw new NotFoundException('Application form not found.');
    }

    if (applicationForm.VerificationStatus !== 'Approved') {
        throw new BadRequestException('Application form must be approved to create a journalist.');
      }

    const allJournalist = await this.journalistRepository.findAll();
    const existingJournalist = allJournalist.find(journalist => journalist.User?.UserID === createJournalistDto.UserID);
    
    if (existingJournalist) {
      throw new BadRequestException('User ia a Journalist.');
    }

    const journalist = await this.journalistRepository.create({
      ...createJournalistDto,
      User: user,
    });

    return journalist;
  }
}

