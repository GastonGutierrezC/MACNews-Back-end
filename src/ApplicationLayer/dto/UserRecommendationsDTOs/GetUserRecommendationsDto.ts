import { ApiProperty } from '@nestjs/swagger';

export class GetUserRecommendationsDto {
  @ApiProperty({
    description: 'List of recommended news article IDs',
    example: [
      'a1141b6e-cc4b-4c0c-a885-fcc96a52962f',
      'b2171b7e-ff4c-4a1c-a776-edc26a52166b',
    ],
  })
  readonly NewsArticleIDs: string[];
}
