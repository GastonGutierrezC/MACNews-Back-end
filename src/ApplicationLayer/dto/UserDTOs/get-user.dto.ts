import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FindUserDto {
  @ApiProperty()
  UserID: string;

  @ApiProperty()
  UserFirstName: string;

  @ApiProperty()
  UserLastName: string;

  @ApiProperty()
  UserEmail: string;

  @ApiPropertyOptional()
  UserImageURL?: string;

  @ApiProperty()
  PasswordUser: string;

  @ApiProperty()
  RoleAssigned: string;

  @ApiPropertyOptional()
  JournalistID?: string;
}
