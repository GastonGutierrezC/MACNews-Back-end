import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { ChannelCategory } from 'src/DomainLayer/Entities/channel.entity';

export class UpdateChannelDto {

  @ApiProperty({
    description: 'channel name',
    example: 'channel name',
  })    
  @IsString()
  @IsOptional()
  ChannelName?: string;

  @ApiProperty({
    description: 'channel description',
    example: 'channel description',
  })  
  @IsString()
  @IsOptional()
  DescriptionChannel?: string;

  @ApiProperty({
    description: 'Channel categories',
    example: 'Politics',
  })  
  @IsEnum(ChannelCategory)
  @IsOptional()
  Categories?: ChannelCategory;

  @ApiProperty({
    description: 'channel image',
    example: 'http://example.com/profile.jpg',
  })  
  @IsUrl()
  @IsOptional()
  ChannelImageURL?: string;
}
