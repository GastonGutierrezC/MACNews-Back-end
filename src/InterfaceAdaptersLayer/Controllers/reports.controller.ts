import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { NewsReviewReportDto } from 'src/ApplicationLayer/dto/ReportsDTOs/news-review-report.dto';
import { UserActivityMonthlyReportDto } from 'src/ApplicationLayer/dto/ReportsDTOs/user-activity-monthly.dto';
import { UserPendingApplicationDto } from 'src/ApplicationLayer/dto/ReportsDTOs/user-pending-applications.dto';
import { UsersByMonthReportDto } from 'src/ApplicationLayer/dto/ReportsDTOs/users-by-month-report.dto';
import { UsersRoleDistributionDto } from 'src/ApplicationLayer/dto/ReportsDTOs/users-role-distribution.dto';
import { GetPendingApplicationsService } from 'src/ApplicationLayer/UseCases/Reports/get-pending-applications.usecase';
import { GetUserActivityRangeService } from 'src/ApplicationLayer/UseCases/Reports/get-user-activity-monthly.service';
import { GetUsersByDateRangeService } from 'src/ApplicationLayer/UseCases/Reports/get-users-by-month-report.usecase';
import { GetUsersRoleDistributionService } from 'src/ApplicationLayer/UseCases/Reports/get-users-role-distribution.usecase';
import { GetNewsReviewReportService } from 'src/ApplicationLayer/UseCases/Reports/get.news-review-report';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';


@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly getUsersByMonthService: GetUsersByDateRangeService,
    private readonly getUserActivityMonthlyService: GetUserActivityRangeService,  
    private readonly getUsersRoleDistributionService: GetUsersRoleDistributionService,
    private readonly getPendingApplicationsService: GetPendingApplicationsService,
    private readonly getNewsReviewReportService: GetNewsReviewReportService,
  ) {}

  @Get('users-by-month')
  @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get number of users registered for a specific year and month with role breakdown' })
  async getUsersByMonth(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<UsersByMonthReportDto> {
    try {

      if (!startDate || !endDate) {
        throw new BadRequestException('Both startDate and endDate parameters are required.');
      }
      return await this.getUsersByMonthService.execute(startDate, endDate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

    @Get('user-activity')
  @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get active vs inactive users for a specific year and month (absolute numbers and percentages)' })
  async getUserActivity(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<UserActivityMonthlyReportDto> {
    try {
      if (!startDate || !endDate) {
        throw new BadRequestException('Both startDate and endDate parameters are required.');
      }
      return await this.getUserActivityMonthlyService.execute(startDate, endDate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Get('users-role-distribution')
  @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get total users and breakdown by role with full name and email list' })
  async getUsersRoleDistribution(): Promise<UsersRoleDistributionDto> {
    try {
      return await this.getUsersRoleDistributionService.execute();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

    @Get('pending-applications')
  @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get latest applications of users pending or rejected (not journalists yet)' })
  async getPendingApplications(): Promise<UserPendingApplicationDto[]> {
    try {
      return await this.getPendingApplicationsService.execute();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

    @Get('news-review')
  @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get number of reviewed, approved, and rejected news in a specific date range' })
  async getNewsReviewReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<NewsReviewReportDto> {
    try {
      if (!startDate || !endDate) {
        throw new BadRequestException('Both startDate and endDate parameters are required.');
      }
      return await this.getNewsReviewReportService.execute(startDate, endDate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
