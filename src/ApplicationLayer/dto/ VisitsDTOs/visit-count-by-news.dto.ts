import { ApiProperty } from '@nestjs/swagger';

export class VisitCountByNewsDto {
  @ApiProperty({
    description: 'Total number of visits for this news',
    example: 35,
  })
  visitCount: number;
}
