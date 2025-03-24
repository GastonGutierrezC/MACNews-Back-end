import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateJournalistDto {
  @IsOptional()
  @IsDateString()
  BirthDate?: string;

  @IsOptional()
  @IsString()
  CardNumber?: string;

  @IsOptional()
  @IsString()
  Reason?: string;

  @IsOptional()
  @IsString()
  ImageCertificateURL?: string;

}
