import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString, IsInt } from 'class-validator';
import { NewsStatus } from 'src/DomainLayer/Entities/news.entity';


export class CreateNewsDto {

  @ApiProperty({
    description: 'ID channel',
    example: 'ID channel',
  })  
  @IsNotEmpty()
  @IsString()
  ChannelID: string; 

  @ApiProperty({
    description: 'Title news',
    example: 'Title news',
  })  
  @IsNotEmpty()
  @IsString()
  Title: string;

  @ApiProperty({
    description: 'Content news',
    example: 'Content news',
  })  
  @IsNotEmpty()
  @IsString()
  Content: string;

  @ApiProperty({
    description: 'Publication Date news',
    example: '2025-03-21',
  })  
  @IsNotEmpty()
  @IsDateString()
  PublicationDate: string;

  @ApiProperty({
    description: 'The URL of the news image',
    example: 'http://example.com/profile.jpg',
  })
  @IsNotEmpty()
  @IsString()
  NewsImageURL: string;

}
