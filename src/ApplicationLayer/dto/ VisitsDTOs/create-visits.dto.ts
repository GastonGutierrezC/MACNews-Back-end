import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitsDto {


  @ApiProperty({
    description: 'News ID',
    example: 'News ID',
  })
  @IsNotEmpty()
  @IsString()
  NewsID: string;
}
