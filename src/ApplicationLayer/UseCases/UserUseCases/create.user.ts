import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../../InfrastructureLayer/Repositories/user.repository';
import { PasswordRepository } from 'src/InfrastructureLayer/Repositories/password.repository';
import { CreatePasswordDto } from 'src/ApplicationLayer/dto/PasswordDTOs/create-password.dto';
import { CreateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto';
import { PasswordEntity } from 'src/DomainLayer/Entities/pasword.entity';
import { RolesEntity } from 'src/DomainLayer/Entities/roles.entity';
import { RolesRepository } from 'src/InfrastructureLayer/Repositories/roles.repository';

@Injectable()
export class CreateUserService {  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordRepository: PasswordRepository, 
    private readonly rolesReposotory: RolesRepository,
  ) {}


  async create(createUserWithPasswordDto: CreateUserWithPasswordDto) {
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

    const rolesData = {
      UserID: createdUser.UserID,
    }
    const createdRole: RolesEntity = await this.rolesReposotory.create(rolesData);

    return { user: createdUser, password: createdPassword , role:createdRole};
  }
}
