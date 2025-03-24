import {
    IsString,
    IsEmail,
    IsOptional,
    Matches,
  } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly UserFirstName?: string;

  @IsOptional()
  @IsString()
  readonly UserLastName?: string;

   @IsEmail()
   @IsOptional()
   @Matches(/^.+@gmail\.com$/, { message: 'Email must end with @gmail.com' })
  readonly UserEmail?: string;

  @IsOptional()
  @IsString()
  readonly UserImageURL?: string;

}
