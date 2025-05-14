import { IsUUID, IsArray, IsString, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRecommendationDto {
  @ApiProperty({
    description: 'User ID (UUID)',
    example: '3f49d463-5523-4777-a85e-1e9f20be12d2',
  })
  @IsUUID()
  readonly UserID: string;

  @ApiProperty({
    description: 'List of recommended news article IDs',
    example: [
      'a1141b6e-cc4b-4c0c-a885-fcc96a52962f',
      'b2171b7e-ff4c-4a1c-a776-edc26a52166b',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly NewsArticleIDs: string[];
}
