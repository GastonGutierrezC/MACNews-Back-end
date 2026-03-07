import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { IRolesRepository } from 'src/InfrastructureLayer/Repositories/Interface/roles.repository.interface';
import { UsersByMonthReportDto } from 'src/ApplicationLayer/dto/ReportsDTOs/users-by-month-report.dto';

@Injectable()
export class GetUsersByDateRangeService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IRolesRepository')
    private readonly rolesRepository: IRolesRepository,
  ) {}

  async execute(startDate: string, endDate: string): Promise<UsersByMonthReportDto> {
    if (!startDate || !endDate) {
      throw new BadRequestException('Start date and end date are required.');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD.');
    }

    if (start > end) {
      throw new BadRequestException('Start date cannot be later than end date.');
    }

    const users = await this.userRepository.findAll();
    const roles = await this.rolesRepository.findAll();

    let total = 0;
    let readers = 0;
    let journalists = 0;

    users.forEach(user => {
      const regDate = new Date(user.RegistrationDate);
      if (regDate >= start && regDate <= end) {
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
