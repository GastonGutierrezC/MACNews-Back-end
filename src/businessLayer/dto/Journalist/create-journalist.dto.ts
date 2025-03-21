import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateJournalistDto {
  @IsNotEmpty()
  @IsString() 
  UserID: string;

  @IsNotEmpty()
  @IsDateString()
  BirthDate: string;

  @IsNotEmpty()
  @IsString()
  CardNumber: string;

  @IsNotEmpty()
  @IsString()
  Reason: string;

  @IsNotEmpty()
  @IsString()
  ImageCertificateURL?: string;

}
