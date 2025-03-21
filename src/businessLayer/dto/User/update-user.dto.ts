import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsEnum,
    Matches,
    MinLength,
    MaxLength,
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

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(16, { message: 'Password must be at most 16 characters long' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @Matches(/[\W_]/, { message: 'Password must contain at least one special character' })
  readonly UserPassword?: string;

  @IsOptional()
  @IsString()
  readonly UserImageURL?: string;

}
