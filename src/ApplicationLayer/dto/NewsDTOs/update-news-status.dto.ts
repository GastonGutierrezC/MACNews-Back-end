import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString, IsInt } from 'class-validator';
import { NewsStatus } from 'src/DomainLayer/Entities/news.entity';

export class UpdateStatusNewsDto {


  @ApiProperty({
    description: 'News Status ',
    example: 'Rejected',
  })    
  @IsOptional()
  @IsEnum(NewsStatus)
  NewsStatus: NewsStatus;


}
