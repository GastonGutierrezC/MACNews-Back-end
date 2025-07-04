import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { CreateJournalistDto } from 'src/ApplicationLayer/dto/JournalistDTOs/create-journalist.dto';
import { JournalistTokenResponseDto } from 'src/ApplicationLayer/dto/JournalistDTOs/JournalistTokenResponse.dto';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { IApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/Interface/applicationForm.repository.interface';
import { IJournalistRepository } from 'src/InfrastructureLayer/Repositories/Interface/journalist.repository.interface';
import { IRolesRepository } from 'src/InfrastructureLayer/Repositories/Interface/roles.repository.interface';
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
     @Inject('IRolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  
async create(createJournalistDto: CreateJournalistDto, UserID: string): Promise<JournalistTokenResponseDto> {
  const user = await this.userRepository.findById(UserID);
  if (!user) {
    throw new NotFoundException(`User with ID ${UserID} not found.`);
  }

  // Obtener el rol asociado al usuario desde rolesRepository
  const roleEntity = await this.rolesRepository.findById(UserID);
  if (!roleEntity) {
    throw new NotFoundException(`Role for user ID ${UserID} not found.`);
  }

  const allApplicationForms = await this.applicationFormRepository.findAll();
  const userForms = allApplicationForms.filter(form => form.User.UserID === UserID);

  if (userForms.length === 0) {
    throw new NotFoundException('No application forms found for this user.');
  }

  const hasApprovedForm = userForms.some(form => form.VerificationStatus === 'Approved');

  if (!hasApprovedForm) {
    throw new BadRequestException('User must have at least one approved application form to become a journalist.');
  }

  const allJournalists = await this.journalistRepository.findAll();
  const existingJournalist = allJournalists.find(journalist => journalist.User?.UserID === UserID);

  if (existingJournalist) {
    throw new BadRequestException('User is already a journalist.');
  }

  const journalist = await this.journalistRepository.create({
    ...createJournalistDto,
    User: user,
  });

  return {
    journalistID: journalist.JournalistID,
    userID: user.UserID,
    userEmail: user.UserEmail,
    role: roleEntity.RoleAssigned,  // Ahora usamos el rol obtenido del repositorio
  };
}

}