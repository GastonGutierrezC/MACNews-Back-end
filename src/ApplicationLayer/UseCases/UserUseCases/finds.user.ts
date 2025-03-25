import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../../DomainLayer/Entities/user.entity';
import { UserRepository } from '../../../InfrastructureLayer/Repositories/user.repository';
import { FindUserDto } from 'src/ApplicationLayer/dto/UserDTOs/get-user.dto';
import { RolesRepository } from 'src/InfrastructureLayer/Repositories/roles.repository';
import { PasswordRepository } from 'src/InfrastructureLayer/Repositories/password.repository';

@Injectable()
export class FindUserService {  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly passwordRepository: PasswordRepository, 
    
  ) {}

  async findUser(UserID: string): Promise<FindUserDto> {
    const user = await this.userRepository.findById(UserID);
    if (!user) {
        throw new NotFoundException(`User with ID ${UserID} not found.`);
    }

    // Buscar el rol asignado al usuario usando findAll
    const allRoles = await this.rolesRepository.findAll();
    const role = allRoles.find(r => r.UserID === UserID);
    const roleAssigned = role ? role.RoleAssigned : null;

    // Buscar la contraseña del usuario usando findAll
    const allPasswords = await this.passwordRepository.findAll();
    const password = allPasswords.find(p => p.UserID === UserID);
    const passwordUser = password ? password.PasswordUser : null;

    // Construir y devolver el DTO
    return {
        UserFirstName: user.UserFirstName,
        UserLastName: user.UserLastName,
        UserEmail: user.UserEmail,
        UserImageURL: user.UserImageURL,
        PasswordUser: passwordUser,
        RoleAssigned: roleAssigned
    };
}

async findUserByEmailAndPassword(email: string, password: string): Promise<FindUserDto> {
  // Buscar al usuario por email
  const allUsers = await this.userRepository.findAll();
  const user = allUsers.find(u => u.UserEmail === email);

  if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
  }

  // Buscar la contraseña del usuario usando findAll
  const allPasswords = await this.passwordRepository.findAll();
  const userPassword = allPasswords.find(p => p.UserID === user.UserID && p.PasswordUser === password);

  if (!userPassword) {
      throw new NotFoundException(`Incorrect password for user with email ${email}.`);
  }

  // Buscar el rol asignado al usuario usando findAll
  const allRoles = await this.rolesRepository.findAll();
  const role = allRoles.find(r => r.UserID === user.UserID);
  const roleAssigned = role ? role.RoleAssigned : null;

  // Construir y devolver el DTO
  return {
      UserFirstName: user.UserFirstName,
      UserLastName: user.UserLastName,
      UserEmail: user.UserEmail,
      UserImageURL: user.UserImageURL,
      PasswordUser: userPassword.PasswordUser,
      RoleAssigned: roleAssigned
  };
}


}
