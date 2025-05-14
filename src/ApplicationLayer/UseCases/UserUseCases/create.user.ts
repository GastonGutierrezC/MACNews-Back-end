import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../../InfrastructureLayer/Repositories/user.repository';
import { PasswordRepository } from 'src/InfrastructureLayer/Repositories/password.repository';
import { CreatePasswordDto } from 'src/ApplicationLayer/dto/PasswordDTOs/create-password.dto';
import { CreateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto';
import { PasswordEntity } from 'src/DomainLayer/Entities/pasword.entity';
import { RolesEntity } from 'src/DomainLayer/Entities/roles.entity';
import { RolesRepository } from 'src/InfrastructureLayer/Repositories/roles.repository';

import { CreateUserResponseDto } from 'src/ApplicationLayer/dto/UserDTOs/create-user-response.dto';
import { CreateUserRecommendationService } from '../UserRecommendationsCases/create.recommendations';
import { CreateUserRecommendationDto } from 'src/ApplicationLayer/dto/UserRecommendationsDTOs/CreateUserRecommendationDto';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordRepository: PasswordRepository,
    private readonly rolesReposotory: RolesRepository,
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

    await this.rolesReposotory.create({ UserID: createdUser.UserID });

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
    };

    return response;
  }
}
