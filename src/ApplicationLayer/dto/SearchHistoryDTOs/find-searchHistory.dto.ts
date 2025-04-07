import { ApiProperty } from '@nestjs/swagger';

export class FindSearchHistoryDto {
  @ApiProperty({
    description: 'The word used in the search',
    example: 'technology',
  })
  SearchWord: string;
}
