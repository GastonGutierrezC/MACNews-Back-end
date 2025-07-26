import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindUserDto } from 'src/ApplicationLayer/dto/UserDTOs/get-user.dto';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { IRolesRepository } from 'src/InfrastructureLayer/Repositories/Interface/roles.repository.interface';
import { IPasswordRepository } from 'src/InfrastructureLayer/Repositories/Interface/password.repository.interface';
import { IJournalistRepository } from 'src/InfrastructureLayer/Repositories/Interface/journalist.repository.interface';
import { FindUserProfileDto } from 'src/ApplicationLayer/dto/UserDTOs/get-profile.dto';

@Injectable()
export class FindUserService {  
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IRolesRepository')
    private readonly rolesRepository: IRolesRepository,
    @Inject('IPasswordRepository')
    private readonly passwordRepository: IPasswordRepository,
    @Inject('IJournalistRepository')
    private readonly journalistRepository: IJournalistRepository,
  ) {}

async findUser(UserID: string): Promise<FindUserProfileDto & { JournalistID?: string }> {
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

  let journalistId: string | undefined;

  if (roleAssigned === 'Journalist') {
    const allJournalists = await this.journalistRepository.findAll();
    const journalist = allJournalists.find(j => j.User.UserID === UserID);
    if (journalist) {
      journalistId = journalist.JournalistID;
    }
  }

  return {
    UserFirstName: user.UserFirstName,
    UserLastName: user.UserLastName,
    UserEmail: user.UserEmail,
    UserImageURL: user.UserImageURL,
    RoleAssigned: roleAssigned,
    JournalistID: journalistId
  };
}

async findUserByEmail(email: string): Promise<FindUserDto & { JournalistID?: string }> {
  const allUsers = await this.userRepository.findAll();
  const user = allUsers.find(u => u.UserEmail === email);

  if (!user) {
    throw new NotFoundException(`User with email ${email} not found.`);
  }

  const allRoles = await this.rolesRepository.findAll();
  const role = allRoles.find(r => r.UserID === user.UserID);
  const roleAssigned = role ? role.RoleAssigned : null;

  let journalistId: string | undefined;

  if (roleAssigned === 'Journalist') {
    const allJournalists = await this.journalistRepository.findAll();
    const journalist = allJournalists.find(j => j.User.UserID === user.UserID);
    if (journalist) {
      journalistId = journalist.JournalistID;
    }
  }

  return {
    UserID: user.UserID,
    UserFirstName: user.UserFirstName,
    UserLastName: user.UserLastName,
    UserEmail: user.UserEmail,
    UserImageURL: user.UserImageURL,
    RoleAssigned: roleAssigned,
    JournalistID: journalistId
  };
}


}
