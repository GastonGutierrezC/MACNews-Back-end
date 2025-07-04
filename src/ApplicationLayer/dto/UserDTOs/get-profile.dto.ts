import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FindUserProfileDto {

  @ApiProperty()
  UserFirstName: string;

  @ApiProperty()
  UserLastName: string;

  @ApiProperty()
  UserEmail: string;

  @ApiPropertyOptional()
  UserImageURL?: string;

  @ApiProperty()
  RoleAssigned: string;

  @ApiPropertyOptional()
  JournalistID?: string;
}
