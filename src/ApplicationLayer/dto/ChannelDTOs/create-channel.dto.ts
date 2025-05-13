import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { ChannelSpecialties } from 'src/DomainLayer/Entities/channel.entity';

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
    description: 'Channel Specialties',
    example: 'Investigative',
  })  
  @IsEnum(ChannelSpecialties)
  @IsNotEmpty()
  Specialties: ChannelSpecialties;

  @ApiProperty({
    description: 'channel image',
    example: 'http://example.com/profile.jpg',
  })  
  @IsUrl()
  @IsOptional()
  ChannelImageURL?: string;
}
