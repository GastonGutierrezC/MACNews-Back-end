import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { ChannelCategory } from 'src/DomainLayer/Entities/channel.entity';

export class CreateChannelDto {

  @ApiProperty({
    description: 'ID of the  Journalist',
    example: 'ID of the Journalist',
  })  
  @IsNotEmpty()
  JournalistID: string;

  @ApiProperty({
    description: 'channel name',
    example: 'channel name',
  })  
  @IsString()
  @IsNotEmpty()
  ChannelName: string;

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
  @IsNotEmpty()
  Categories: ChannelCategory;

  @ApiProperty({
    description: 'channel image',
    example: 'http://example.com/profile.jpg',
  })  
  @IsUrl()
  @IsOptional()
  ChannelImageURL?: string;
}
