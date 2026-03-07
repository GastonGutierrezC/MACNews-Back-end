import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { IVisitRepository } from 'src/InfrastructureLayer/Repositories/Interface/visits.repository.interface';
import { ICommentPostRepository } from 'src/InfrastructureLayer/Repositories/Interface/commentPost.repository.interface';
import { IFollowChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/followChannel.repository.interface';
import { ISearchHistoryRepository } from 'src/InfrastructureLayer/Repositories/Interface/searchHistory.repository.interface';
import { UserActivityMonthlyReportDto } from 'src/ApplicationLayer/dto/ReportsDTOs/user-activity-monthly.dto';

@Injectable()
export class GetUserActivityRangeService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IVisitRepository')
    private readonly visitsRepository: IVisitRepository,
    @Inject('ICommentPostRepository')
    private readonly commentPostRepository: ICommentPostRepository,
    @Inject('IFollowChannelRepository')
    private readonly followChannelRepository: IFollowChannelRepository,
    @Inject('ISearchHistoryRepository')
    private readonly searchHistoryRepository: ISearchHistoryRepository,
  ) {}

  async execute(startDate: string, endDate: string): Promise<UserActivityMonthlyReportDto> {
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
    const visits = await this.visitsRepository.findAll();
    const comments = await this.commentPostRepository.findAll();
    const follows = await this.followChannelRepository.findAll();
    const searches = await this.searchHistoryRepository.findAll();

    const activeUserIDs = new Set<string>();

    // Helper para verificar si la fecha está dentro del rango
    const isInRange = (date: Date) => date >= start && date <= end;

    visits.forEach(v => {
      if (v.DateVisit && isInRange(new Date(v.DateVisit))) {
        activeUserIDs.add(v.User.UserID);
      }
    });

    comments.forEach(c => {
      if (c.DateComment && isInRange(new Date(c.DateComment))) {
        activeUserIDs.add(c.User.UserID);
      }
    });

    follows.forEach(f => {
      if (f.FollowDate && isInRange(new Date(f.FollowDate))) {
        activeUserIDs.add(f.User.UserID);
      }
    });

    searches.forEach(s => {
      if (s.SearchDate && isInRange(new Date(s.SearchDate))) {
        activeUserIDs.add(s.User.UserID);
      }
    });

    const totalUsers = users.length;
    const activeUsers = activeUserIDs.size;
    const inactiveUsers = totalUsers - activeUsers;

    return new UserActivityMonthlyReportDto({
      totalUsers,
      activeUsers,
      inactiveUsers,
      percentActive: totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0,
      percentInactive: totalUsers > 0 ? (inactiveUsers / totalUsers) * 100 : 0,
    });
  }
}
