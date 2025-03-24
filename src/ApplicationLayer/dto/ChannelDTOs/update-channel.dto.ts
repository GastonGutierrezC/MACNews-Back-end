import { IsString, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { ChannelCategory } from 'src/DomainLayer/Entities/channel.entity';

export class UpdateChannelDto {
  @IsString()
  @IsOptional()
  ChannelName?: string;

  @IsString()
  @IsOptional()
  DescriptionChannel?: string;

  @IsEnum(ChannelCategory)
  @IsOptional()
  Categories?: ChannelCategory;

  @IsUrl()
  @IsOptional()
  ChannelImageURL?: string;
}
