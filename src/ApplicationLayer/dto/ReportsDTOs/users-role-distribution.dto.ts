export class UserInfoDto {
  fullName: string;
  email: string;

  constructor(fullName: string, email: string) {
    this.fullName = fullName;
    this.email = email;
  }
}

export class UsersRoleDistributionDto {
  totalUsers: number;
  readers: number;
  journalists: number;
  administrators: number;
  readerList: UserInfoDto[];
  journalistList: UserInfoDto[];
  administratorList: UserInfoDto[];

  constructor(partial: Partial<UsersRoleDistributionDto>) {
    Object.assign(this, partial);
  }
}
