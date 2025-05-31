import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsUrl,
  IsArray,
} from 'class-validator';
import { ChannelSpecialties } from 'src/DomainLayer/Entities/channel.entity';

export class UpdateChannelDto {
  @ApiProperty({
    description: 'Channel name',
    example: 'channel name',
  })
  @IsString()
  @IsOptional()
  ChannelName?: string;

  @ApiProperty({
    description: 'Channel description',
    example: 'channel description',
  })
  @IsString()
  @IsOptional()
  DescriptionChannel?: string;

  @ApiProperty({
    description: 'Channel specialties',
    example: ['Opinion', 'Interpretive'],
    isArray: true,
    enum: ChannelSpecialties,
  })
  @IsArray()
  @IsEnum(ChannelSpecialties, { each: true })
  @IsOptional()
  Specialties?: ChannelSpecialties[];

  @ApiProperty({
    description: 'Channel image URL',
    example: 'http://example.com/profile.jpg',
  })
  @IsUrl()
  @IsOptional()
  ChannelImageURL?: string;
}
