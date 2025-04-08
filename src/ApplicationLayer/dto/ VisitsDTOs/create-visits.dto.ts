import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitsDto {

  @ApiProperty({
    description: 'User ID',
    example: 'User ID',
  })
  @IsNotEmpty()
  @IsString()
  UserID: string;

  @ApiProperty({
    description: 'News ID',
    example: 'News ID',
  })
  @IsNotEmpty()
  @IsString()
  NewsID: string;
}
