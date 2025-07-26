
import { UploadImageResponseDto } from "../DTO/upload-image-response.dto";

export interface IUploadService {
  uploadImage(file: Express.Multer.File): Promise<UploadImageResponseDto>;
}
