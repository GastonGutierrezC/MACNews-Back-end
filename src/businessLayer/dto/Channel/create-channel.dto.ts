import { IsNotEmpty, IsString, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { ChannelCategory } from 'src/dataLayer/entities/channel.entity';

export class CreateChannelDto {
  @IsNotEmpty()
  JournalistID: string;

  @IsString()
  @IsNotEmpty()
  ChannelName: string;

  @IsString()
  @IsOptional()
  DescriptionChannel?: string;

  @IsEnum(ChannelCategory)
  @IsNotEmpty()
  Categories: ChannelCategory;

  @IsUrl()
  @IsOptional()
  ChannelImageURL?: string;
}
