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

    const allRoles = await this.rolesRepository.findAll();
    const role = allRoles.find(r => r.UserID === UserID);
    const roleAssigned = role ? role.RoleAssigned : null;

    const allPasswords = await this.passwordRepository.findAll();
    const password = allPasswords.find(p => p.UserID === UserID);
    const passwordUser = password ? password.PasswordUser : null;

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
  const allUsers = await this.userRepository.findAll();
  const user = allUsers.find(u => u.UserEmail === email);

  if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
  }

  const allPasswords = await this.passwordRepository.findAll();
  const userPassword = allPasswords.find(p => p.UserID === user.UserID && p.PasswordUser === password);

  if (!userPassword) {
      throw new NotFoundException(`Incorrect password for user with email ${email}.`);
  }

  const allRoles = await this.rolesRepository.findAll();
  const role = allRoles.find(r => r.UserID === user.UserID);
  const roleAssigned = role ? role.RoleAssigned : null;

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
