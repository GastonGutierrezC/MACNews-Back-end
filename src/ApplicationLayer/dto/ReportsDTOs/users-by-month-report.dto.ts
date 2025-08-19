export class UsersByMonthReportDto {

  totalUsers: number;
  readers: number;
  journalists: number;

  constructor(partial: Partial<UsersByMonthReportDto>) {
    Object.assign(this, partial);
  }
}
