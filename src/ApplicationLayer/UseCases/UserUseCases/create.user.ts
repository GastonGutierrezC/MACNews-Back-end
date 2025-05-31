import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { CreateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto';
import { PasswordEntity } from 'src/DomainLayer/Entities/pasword.entity';
import { CreateUserResponseDto } from 'src/ApplicationLayer/dto/UserDTOs/create-user-response.dto';
import { CreateUserRecommendationService } from '../UserRecommendationsCases/create.recommendations';
import { CreateUserRecommendationDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/CreateUserRecommendationDto';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { IRolesRepository } from 'src/InfrastructureLayer/Repositories/Interface/roles.repository.interface';
import { IPasswordRepository } from 'src/InfrastructureLayer/Repositories/Interface/password.repository.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordRepository')
    private readonly passwordRepository: IPasswordRepository,
    @Inject('IRolesRepository')
    private readonly rolesReposotory: IRolesRepository,
    private readonly createRecommendationService: CreateUserRecommendationService, // 👈 nuevo servicio inyectado

  ) {}

  async create(createUserWithPasswordDto: CreateUserWithPasswordDto): Promise<CreateUserResponseDto> {
    const { user, password } = createUserWithPasswordDto;
    const { UserEmail } = user;

    const existingUser = await this.userRepository.findAll();
    const userExists = existingUser.find(existing => existing.UserEmail === UserEmail);

    if (userExists) {
      throw new BadRequestException('Email is already in use.');
    }

    const createdUser = await this.userRepository.create(user);

    const passwordData = {
      UserID: createdUser.UserID,
      PasswordUser: password.PasswordUser,
    };
    const createdPassword: PasswordEntity = await this.passwordRepository.create(passwordData);

    const createRole = await this.rolesReposotory.create({ UserID: createdUser.UserID });

    const recommendationData: CreateUserRecommendationDto = {
      UserID: createdUser.UserID,
    };
    await this.createRecommendationService.create(recommendationData);
    
    const response: CreateUserResponseDto = {
      UserID: createdUser.UserID,
      UserFirstName: createdUser.UserFirstName,
      UserLastName: createdUser.UserLastName,
      UserEmail: createdUser.UserEmail,
      UserImageURL: createdUser.UserImageURL,
      PasswordUser: createdPassword.PasswordUser,
      RoleAssigned: createRole.RoleAssigned,
    };

    return response;
  }
}
