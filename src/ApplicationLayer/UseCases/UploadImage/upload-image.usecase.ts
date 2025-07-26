// src/ApplicationLayer/UseCases/Upload/upload-image.usecase.ts
import { Injectable, Inject } from '@nestjs/common';
import { Express } from 'express';

import { UploadImageResponseDto } from 'src/InfrastructureLayer/UploadCloudinary/DTO/upload-image-response.dto';
import { IUploadService } from 'src/InfrastructureLayer/UploadCloudinary/Interfaces/upload.interface';

@Injectable()
export class UploadImageUseCase {
  constructor(
    @Inject('IUploadService')
    private readonly uploadService: IUploadService,
  ) {}

  async execute(file: Express.Multer.File): Promise<UploadImageResponseDto> {
    return this.uploadService.uploadImage(file);
  }
}

