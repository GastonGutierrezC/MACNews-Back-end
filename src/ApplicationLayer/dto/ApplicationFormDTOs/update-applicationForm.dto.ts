import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateApplicationFormDto {

  @ApiProperty({
    description: 'BirthDate del usuario',
    example: '2025-03-24',
  })    
  @IsOptional()
  @IsDateString()
  BirthDate?: string;

  @ApiProperty({
    description: 'CardNumber del usuario',
    example: '123456',
  })  
  @IsOptional()
  @IsString()
  CardNumber?: string;

  @ApiProperty({
    description: 'Reason del usuario',
    example: 'Reason for to be a reporter',
  })  
  @IsOptional()
  @IsString()
  Reason?: string;

  @ApiProperty({
    description: 'La URL de la imagen de certificado del usuario',
    example: 'http://example.com/profile.jpg',
  })
  @IsOptional()
  @IsString()
  ImageCertificateURL?: string;

}
