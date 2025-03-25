import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateApplicationFormDto {

  @ApiProperty({
    description: 'User ID',
    example: 'User ID',
  })
    
  @IsNotEmpty()
  @IsString() 
  UserID: string;

  @ApiProperty({
    description: 'BirthDate of the User',
    example: '2025-03-24',
  })  
  @IsNotEmpty()
  @IsDateString()
  BirthDate: string;

  @ApiProperty({
    description: 'Card Number of the User',
    example: '123456',
  })  
  @IsNotEmpty()
  @IsString()
  CardNumber: string;

  @ApiProperty({
    description: 'Reason for to be a reporter',
    example: 'Reason for to be a reporter',
  })  
  @IsNotEmpty()
  @IsString()
  Reason: string;

  @ApiProperty({
    description: 'The URL of the users certificate image',
    example: 'http://example.com/profile.jpg',
  })
  @IsNotEmpty()
  @IsString()
  ImageCertificateURL?: string;

}
