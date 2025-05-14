import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRecommendationDto {
  @ApiProperty({
    description: 'User ID (UUID)',
    example: '3f49d463-5523-4777-a85e-1e9f20be12d2',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly UserID: string;
}
