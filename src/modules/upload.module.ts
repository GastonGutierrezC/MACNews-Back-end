// src/InfrastructureLayer/Upload/upload.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadImageUseCase } from 'src/ApplicationLayer/UseCases/UploadImage/upload-image.usecase';
import { UploadService } from 'src/InfrastructureLayer/UploadCloudinary/upload.service';
import { UploadController } from 'src/InterfaceAdaptersLayer/Controllers/upload.controller';



@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [UploadController],
  providers: [
    {
      provide: 'IUploadService',
      useClass: UploadService,
    },
    UploadService,
    UploadImageUseCase,
  ],
  exports: [
    {
      provide: 'IUploadService',
      useClass: UploadService,
    },
    UploadImageUseCase,
  ],
})
export class UploadModule {}