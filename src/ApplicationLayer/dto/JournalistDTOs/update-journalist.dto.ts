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
    description: 'Specialty del Journalist',
    example: 'Soy especialista en noticias de politica',
  })
  @IsString()
  @IsOptional()
  readonly Specialty: string;

  @ApiProperty({
    description: 'experiencia del usuario',
    example: 'he trabajado muchos años en un canal de television',
  })
  @IsString()
  @IsOptional()
  readonly JournalisticExperience: string;

}
