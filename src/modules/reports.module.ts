import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/DomainLayer/Entities/user.entity';
import { RolesEntity } from 'src/DomainLayer/Entities/roles.entity';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';
import { RolesRepository } from 'src/InfrastructureLayer/Repositories/roles.repository';
import { GetUsersByMonthService } from 'src/ApplicationLayer/UseCases/Reports/get-users-by-month-report.usecase';
import { ReportsController } from 'src/InterfaceAdaptersLayer/Controllers/reports.controller';
import { GetUserActivityMonthlyService } from 'src/ApplicationLayer/UseCases/Reports/get-user-activity-monthly.service';
import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';
import { SearchHistoryEntity } from 'src/DomainLayer/Entities/SearchHistory.entity';
import { VisitsEntity } from 'src/DomainLayer/Entities/visits.entity';
import { VisitsRepository } from 'src/InfrastructureLayer/Repositories/visits.repository';
import { CommentPostRepository } from 'src/InfrastructureLayer/Repositories/commentPost.repository';
import { FollowChannelRepository } from 'src/InfrastructureLayer/Repositories/followChannel.repository';
import { SearchHistoryRepository } from 'src/InfrastructureLayer/Repositories/searchHistory.repository';
import { GetUsersRoleDistributionService } from 'src/ApplicationLayer/UseCases/Reports/get-users-role-distribution.usecase';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';
import { GetPendingApplicationsService } from 'src/ApplicationLayer/UseCases/Reports/get-pending-applications.usecase';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RolesEntity,
      VisitsEntity,
      CommentPostEntity,
      FollowChannelEntity,
      SearchHistoryEntity,
      JournalistEntity,
      ApplicationFormEntity
    ]),
  ],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IRolesRepository',
      useClass: RolesRepository,
    },
        {
      provide: 'IVisitRepository',
      useClass: VisitsRepository,
    },
            {
      provide: 'ICommentPostRepository',
      useClass: CommentPostRepository,
    },
            {
      provide: 'IFollowChannelRepository',
      useClass: FollowChannelRepository,
    },
            {
      provide: 'ISearchHistoryRepository',
      useClass: SearchHistoryRepository,
    },
                {
      provide: 'IJournalistRepository',
      useClass: JournalistRepository,
    },         
    {
      provide: 'IApplicationFormRepository',
      useClass: ApplicationFormRepository,
    },
    GetUsersByMonthService,
    GetUserActivityMonthlyService,
    GetUsersRoleDistributionService,
    GetPendingApplicationsService
  ],
  controllers: [ReportsController],
  exports: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IRolesRepository',
      useClass: RolesRepository,
    },
        {
      provide: 'IVisitRepository',
      useClass: VisitsRepository,
    },
            {
      provide: 'ICommentPostRepository',
      useClass: CommentPostRepository,
    },
            {
      provide: 'IFollowChannelRepository',
      useClass: FollowChannelRepository,
    },
            {
      provide: 'ISearchHistoryRepository',
      useClass: SearchHistoryRepository,
    },
                    {
      provide: 'IJournalistRepository',
      useClass: JournalistRepository,
    },
                        {
      provide: 'IApplicationFormRepository',
      useClass: ApplicationFormRepository,
    },
    GetUsersByMonthService,
    GetUserActivityMonthlyService,
    GetUsersRoleDistributionService,
    GetPendingApplicationsService
  ],
})
export class ReportsModule {}