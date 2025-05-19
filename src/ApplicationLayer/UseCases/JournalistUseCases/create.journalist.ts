import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { CreateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/create-journalist.dto';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { IApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/Interface/applicationForm.repository.interface';
import { IJournalistRepository } from 'src/InfrastructureLayer/Repositories/Interface/journalist.repository.interface';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';

@Injectable()
export class CreateJournalistService {
  constructor(
    @Inject('IApplicationFormRepository')
    private readonly applicationFormRepository: IApplicationFormRepository,
    @Inject('IJournalistRepository')
    private readonly journalistRepository: IJournalistRepository,  
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

  ) {}

  async create(createJournalistDto: CreateJournalistDto): Promise<JournalistEntity> {
    const user = await this.userRepository.findById(createJournalistDto.UserID);
    if (!user) {
      throw new NotFoundException(`User with ID ${createJournalistDto.UserID} not found.`);
    }

    const allApplicationForms = await this.applicationFormRepository.findAll();
    const userForms = allApplicationForms.filter(form => form.User.UserID === createJournalistDto.UserID);

    if (userForms.length === 0) {
      throw new NotFoundException('No application forms found for this user.');
    }

    const hasApprovedForm = userForms.some(form => form.VerificationStatus === 'Approved');

    if (!hasApprovedForm) {
      throw new BadRequestException('User must have at least one approved application form to become a journalist.');
    }

    const allJournalists = await this.journalistRepository.findAll();
    const existingJournalist = allJournalists.find(journalist => journalist.User?.UserID === createJournalistDto.UserID);

    if (existingJournalist) {
      throw new BadRequestException('User is already a journalist.');
    }

    const journalist = await this.journalistRepository.create({
      ...createJournalistDto,
      User: user,
    });

    return journalist;
  }
}

