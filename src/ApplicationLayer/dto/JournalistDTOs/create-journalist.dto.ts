import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class CreateJournalistDto {


@ApiProperty({
 description: 'Application Form of the Journalist',
 example: 'ID  Application Form',
})
        
@IsNotEmpty()
@IsString() 
readonly ApplicationFormID: string;

  @ApiProperty({
    description: 'Specialty of the Journalist',
    example: 'I am a specialist in political news',
  })
  @IsString()
  @IsNotEmpty()
  readonly Specialty: string;

  @ApiProperty({
    description: 'Experience of the Journalist',
    example: 'I have worked for many years in a television channel',
  })
  @IsString()
  @IsNotEmpty()
  readonly JournalisticExperience: string;

}
