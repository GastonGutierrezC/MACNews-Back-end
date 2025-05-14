import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class CreateUserDto {
  @ApiProperty({
    description: 'UserFirst Name',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly UserFirstName: string;

  @ApiProperty({
    description: 'User Last Name',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly UserLastName: string;

  @ApiProperty({
    description: 'The users e-mail address ',
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^.+@gmail\.com$/, { message: 'Email must end with @gmail.com' })
  readonly UserEmail: string;

  @ApiProperty({
    description: 'The URL of the users profile picture',
    example: 'http://example.com/profile.jpg',
  })
  @IsOptional()
  @IsString()
  readonly UserImageURL: string;
}
