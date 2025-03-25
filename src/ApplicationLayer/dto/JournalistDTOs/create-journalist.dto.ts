import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class CreateJournalistDto {


@ApiProperty({
 description: 'Application Form del Journalist',
 example: 'ID del Application Form',
})
        
@IsNotEmpty()
@IsString() 
readonly ApplicationFormID: string;

  @ApiProperty({
    description: 'Specialty del Journalist',
    example: 'Soy especialista en noticias de politica',
  })
  @IsString()
  @IsNotEmpty()
  readonly Specialty: string;

  @ApiProperty({
    description: 'experiencia del usuario',
    example: 'he trabajado muchos años en un canal de television',
  })
  @IsString()
  @IsNotEmpty()
  readonly JournalisticExperience: string;

}
