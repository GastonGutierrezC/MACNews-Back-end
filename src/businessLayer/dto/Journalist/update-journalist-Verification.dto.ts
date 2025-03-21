import { IsEnum, IsNotEmpty } from 'class-validator';
import { VerificationStatus } from 'src/dataLayer/entities/journalist.entity';

export class UpdateJournalistVerificationDto {
  @IsNotEmpty()
  @IsEnum(VerificationStatus, { message: 'JournalistVerification must be a valid enum value' })
  VerificationStatus: VerificationStatus;
}
