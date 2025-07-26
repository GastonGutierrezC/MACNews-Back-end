// src/InfrastructureLayer/Upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { IUploadService } from './Interfaces/upload.interface';

@Injectable()
export class UploadService implements IUploadService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<{ secure_url: string; }> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'certificados',
          public_id: file.originalname.split('.')[0],
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error('No se recibió resultado de la subida a Cloudinary'));
          }

          const secureUrl = result.secure_url;
          const optimizedUrl = cloudinary.url(result.public_id, {
            fetch_format: 'auto',
            quality: 'auto',
          });
          resolve({ secure_url: secureUrl});
        },
      );

      const readable = Readable.from(file.buffer);
      readable.pipe(stream);
    });
  }
}
