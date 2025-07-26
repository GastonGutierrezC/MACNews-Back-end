// src/InfrastructureLayer/Upload/upload.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { UploadImageDto } from 'src/ApplicationLayer/dto/UploadImageDTOs/upload-image.dto';
import { UploadImageUseCase } from 'src/ApplicationLayer/UseCases/UploadImage/upload-image.usecase';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';


@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadImageUseCase: UploadImageUseCase) {}

  @Post('image')
  @ApiOperation({ summary: 'Sube una imagen a Cloudinary' })
  @Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file || !['image/jpeg', 'image/png'].includes(file.mimetype)) {
      throw new HttpException('Solo se permiten imágenes JPG o PNG.', HttpStatus.BAD_REQUEST);
    }

    return await this.uploadImageUseCase.execute(file);
  }
}
