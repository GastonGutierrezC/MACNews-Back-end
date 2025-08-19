import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { IRolesRepository } from 'src/InfrastructureLayer/Repositories/Interface/roles.repository.interface';
import { UsersByMonthReportDto } from 'src/ApplicationLayer/dto/ReportsDTOs/users-by-month-report.dto';


@Injectable()
export class GetUsersByMonthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IRolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async execute(year: number, month: number): Promise<UsersByMonthReportDto> {
    if (month < 1 || month > 12) {
      throw new BadRequestException('Month must be between 1 and 12.');
    }

    const users = await this.userRepository.findAll();
    const roles = await this.rolesRepository.findAll();

    let total = 0;
    let readers = 0;
    let journalists = 0;

    users.forEach(user => {
      const regDate = new Date(user.RegistrationDate);
      if (regDate.getFullYear() === year && regDate.getMonth() + 1 === month) {
        total++;

        const userRole = roles.find(r => r.UserID === user.UserID)?.RoleAssigned;
        if (userRole === 'Journalist') {
          journalists++;
        } else {
          readers++;
        }
      }
    });

    return new UsersByMonthReportDto({
      totalUsers: total,
      readers,
      journalists,
    });
  }
}
