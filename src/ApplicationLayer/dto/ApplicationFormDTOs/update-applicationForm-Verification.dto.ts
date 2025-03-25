import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { VerificationStatus } from 'src/DomainLayer/Entities/applicationForm.entity';

export class UpdateApplicationFormVerificationDto {

  @ApiProperty({
    description: 'application status',
    example: 'Checking',
  })    
  @IsNotEmpty()
  @IsEnum(VerificationStatus, { message: 'Journalist Verification must be a valid enum value' })
  VerificationStatus: VerificationStatus;
}
