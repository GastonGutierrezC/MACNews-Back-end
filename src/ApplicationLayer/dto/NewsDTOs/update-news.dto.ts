import { IsString, IsOptional, IsEnum, IsDateString, IsInt } from 'class-validator';
import { NewsStatus } from 'src/DomainLayer/Entities/news.entity';

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  Title: string;

  @IsOptional()
  @IsString()
  Content: string;

  @IsOptional()
  @IsDateString()
  PublicationDate: string;

  @IsOptional()
  @IsEnum(NewsStatus)
  NewsStatus: NewsStatus;

  @IsOptional()
  @IsString()
  NewsImageURL: string;

  @IsOptional()
  @IsInt()
  NumberOfViews: number;

  @IsOptional()
  @IsString()
  ChannelID: string; 
}
