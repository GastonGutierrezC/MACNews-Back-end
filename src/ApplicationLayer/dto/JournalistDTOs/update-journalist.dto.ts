import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class UpdateJournalistDto {

  @ApiProperty({
    description: 'Specialty of the Journalist',
    example: 'I am a specialist in political news',
  })
  @IsString()
  @IsOptional()
  readonly Specialty: string;

  @ApiProperty({
    description: 'Experience of the Journalist',
    example: 'I have worked for many years in a television channel',
  })
  @IsString()
  @IsOptional()
  readonly JournalisticExperience: string;

}
