import { ApiProperty } from '@nestjs/swagger';

export class NewsTopDto {
  @ApiProperty({
    description: 'Unique identifier of the news',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  NewsID: string;

  @ApiProperty({
    description: 'Title of the news',
    example: 'New discovery in quantum physics',
  })
  Title: string;

  @ApiProperty({
    description: 'NewsImageURL of the news',
    example: 'NewsImageURL',
  })
  NewsImageURL: string;
}
