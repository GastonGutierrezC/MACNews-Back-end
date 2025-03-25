import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { VerificationStatus } from 'src/DomainLayer/Entities/applicationForm.entity';

export class UpdateApplicationFormVerificationDto {

  @ApiProperty({
    description: 'estado de la solicitud',
    example: 'Checking',
  })    
  @IsNotEmpty()
  @IsEnum(VerificationStatus, { message: 'JournalistVerification must be a valid enum value' })
  VerificationStatus: VerificationStatus;
}
