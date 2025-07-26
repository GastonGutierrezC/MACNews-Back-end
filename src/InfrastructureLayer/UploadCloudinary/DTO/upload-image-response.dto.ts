// src/ApplicationLayer/DTO/Upload/upload-image-response.dto.ts

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadImageResponseDto {
  @ApiProperty({
    description: 'URL segura de la imagen en Cloudinary',
    example: 'https://res.cloudinary.com/tu-nombre/image/upload/v1/certificados/img_123.jpg',
  })
  @IsString()
  secure_url: string;

}
