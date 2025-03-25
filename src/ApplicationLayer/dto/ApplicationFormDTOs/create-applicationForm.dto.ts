import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateApplicationFormDto {

  @ApiProperty({
    description: 'password del usuario',
    example: 'ID del usuario',
  })
    
  @IsNotEmpty()
  @IsString() 
  UserID: string;

  @ApiProperty({
    description: 'BirthDate del usuario',
    example: '2025-03-24',
  })  
  @IsNotEmpty()
  @IsDateString()
  BirthDate: string;

  @ApiProperty({
    description: 'CardNumber del usuario',
    example: '123456',
  })  
  @IsNotEmpty()
  @IsString()
  CardNumber: string;

  @ApiProperty({
    description: 'Reason del usuario',
    example: 'Reason for to be a reporter',
  })  
  @IsNotEmpty()
  @IsString()
  Reason: string;

  @ApiProperty({
    description: 'La URL de la imagen de certificado del usuario',
    example: 'http://example.com/profile.jpg',
  })
  @IsNotEmpty()
  @IsString()
  ImageCertificateURL?: string;

}
