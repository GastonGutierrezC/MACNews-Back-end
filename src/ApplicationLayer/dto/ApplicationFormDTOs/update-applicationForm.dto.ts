import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateApplicationFormDto {

  @ApiProperty({
    description: 'BirthDate of the user',
    example: '2025-03-24',
  })    
  @IsOptional()
  @IsDateString()
  BirthDate?: string;

  @ApiProperty({
    description: 'Card Number  of the user',
    example: '123456',
  })  
  @IsOptional()
  @IsString()
  CardNumber?: string;

  @ApiProperty({
    description: 'Reason for to be a reporter',
    example: 'Reason for to be a reporter',
  })  
  @IsOptional()
  @IsString()
  Reason?: string;

  @ApiProperty({
    description: 'The URL of the users certificate image',
    example: 'http://example.com/profile.jpg',
  })
  @IsOptional()
  @IsString()
  ImageCertificateURL?: string;

}
