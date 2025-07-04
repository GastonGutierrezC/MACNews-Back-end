import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSearchHistoryDto {

  @ApiProperty({
    description: 'Search keyword or phrase',
    example: 'Artificial Intelligence',
  })
  @IsNotEmpty()
  @IsString()
  SearchWord: string;


}

