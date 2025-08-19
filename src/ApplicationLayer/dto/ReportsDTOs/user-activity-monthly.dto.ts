export class UserActivityMonthlyReportDto {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  percentActive: number;
  percentInactive: number;

  constructor(partial: Partial<UserActivityMonthlyReportDto>) {
    Object.assign(this, partial);
  }
}
