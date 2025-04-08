import { ApiProperty } from '@nestjs/swagger';

export class VisitedNewsByUserDto {
  @ApiProperty({
    description: 'Title of the visited news',
    example: 'Breaking News: Economic Update',
  })
  Title: string;

  @ApiProperty({
    description: 'Category of the visited news',
    example: 'Politics',
  })
  Category: string;
}
