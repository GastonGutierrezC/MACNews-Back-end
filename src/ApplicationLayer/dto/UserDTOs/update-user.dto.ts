import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsOptional,
    Matches,
  } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({
    description: 'User First Name',
    example: 'John',
  })  
  @IsOptional()
  @IsString()
  readonly UserFirstName?: string;

  @ApiProperty({
    description: 'User Last Name',
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  readonly UserLastName?: string;

  @ApiProperty({
    description: 'The users e-mail address ',
    example: 'johndoe@gmail.com',
  })
   @IsEmail()
   @IsOptional()
   @Matches(/^.+@gmail\.com$/, { message: 'Email must end with @gmail.com' })
  readonly UserEmail?: string;

  @ApiProperty({
    description: 'The URL of the users profile picture',
    example: 'http://example.com/profile.jpg',
  })  
  @IsOptional()
  @IsString()
  readonly UserImageURL?: string;

}
