import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/UserDTOs/create-user.dto'; 
import { UserEntity } from '../../../DomainLayer/Entities/user.entity';
import { UserRepository } from '../../../InfrastructureLayer/Repositories/user.repository';
import { PasswordRepository } from 'src/InfrastructureLayer/Repositories/password.repository';
import { CreatePasswordDto } from 'src/ApplicationLayer/dto/PasswordDTOs/create-password.dto';
import { CreateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto';
import { PasswordEntity } from 'src/DomainLayer/Entities/pasword.entity';

@Injectable()
export class CreateUserService {  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordRepository: PasswordRepository, 
  ) {}


  async create(createUserWithPasswordDto: CreateUserWithPasswordDto) {
    const { user, password } = createUserWithPasswordDto;
    const { UserEmail } = user;

    // Verificar si ya existe un usuario con el mismo correo electrónico o una contraseña repetida
    const existingUser = await this.userRepository.findAll();  // Trae todos los usuarios
    const userExists = existingUser.find(existing => existing.UserEmail === UserEmail);
    const passwordExists = existingUser.find(existing => existing.password && existing.password.PasswordUser === password.PasswordUser);

    if (userExists) {
      throw new BadRequestException('Email is already in use.');
    }

    if (passwordExists) {
      throw new BadRequestException('Password is already in use.');
    }

    // Crear el usuario
    const createdUser = await this.userRepository.create(user);

    // Crear la contraseña
    const passwordData = {
      UserID: createdUser.UserID,
      PasswordUser: password.PasswordUser,
    };
    const createdPassword: PasswordEntity = await this.passwordRepository.create(passwordData);

    // Devolver el usuario y la contraseña
    return { user: createdUser, password: createdPassword };
  }
}
