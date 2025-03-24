import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString, IsInt } from 'class-validator';
import { NewsStatus } from 'src/DomainLayer/Entities/news.entity';


export class CreateNewsDto {

  @IsNotEmpty()
  @IsString()
  ChannelID: string; 

  @IsNotEmpty()
  @IsString()
  Title: string;

  @IsNotEmpty()
  @IsString()
  Content: string;

  @IsNotEmpty()
  @IsDateString()
  PublicationDate: string;

  @IsNotEmpty()
  @IsEnum(NewsStatus)
  NewsStatus: NewsStatus;

  @IsNotEmpty()
  @IsString()
  NewsImageURL: string;

}
