import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { IRolesRepository } from 'src/InfrastructureLayer/Repositories/Interface/roles.repository.interface';
import { UserInfoDto, UsersRoleDistributionDto } from 'src/ApplicationLayer/dto/ReportsDTOs/users-role-distribution.dto';

@Injectable()
export class GetUsersRoleDistributionService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IRolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async execute(): Promise<UsersRoleDistributionDto> {
    const users = await this.userRepository.findAll();
    const roles = await this.rolesRepository.findAll();

    const totalUsers = users.length;

    const readerUsers = roles.filter(r => r.RoleAssigned === 'Reader');
    const journalistUsers = roles.filter(r => r.RoleAssigned === 'Journalist');
    const administratorUsers = roles.filter(r => r.RoleAssigned === 'Administrator');

    const readerList = readerUsers.map(r => {
      const user = users.find(u => u.UserID === r.UserID);
      return user ? new UserInfoDto(`${user.UserFirstName} ${user.UserLastName}`, user.UserEmail) : null;
    }).filter(u => u !== null);

    const journalistList = journalistUsers.map(r => {
      const user = users.find(u => u.UserID === r.UserID);
      return user ? new UserInfoDto(`${user.UserFirstName} ${user.UserLastName}`, user.UserEmail) : null;
    }).filter(u => u !== null);

    const administratorList = administratorUsers.map(r => {
      const user = users.find(u => u.UserID === r.UserID);
      return user ? new UserInfoDto(`${user.UserFirstName} ${user.UserLastName}`, user.UserEmail) : null;
    }).filter(u => u !== null);

    return new UsersRoleDistributionDto({
      totalUsers,
      readers: readerUsers.length,
      journalists: journalistUsers.length,
      administrators: administratorUsers.length,
      readerList,
      journalistList,
      administratorList,
    });
  }
}
