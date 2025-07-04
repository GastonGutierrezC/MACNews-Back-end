import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsUrl, IsArray, ArrayNotEmpty } from 'class-validator';
import { ChannelSpecialties } from 'src/DomainLayer/Entities/channel.entity';

export class CreateChannelDto {


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
    example: ['Opinion', 'Interpretive'],
    isArray: true,
    enum: ChannelSpecialties,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ChannelSpecialties, { each: true })
  Specialties: ChannelSpecialties[];

  @ApiProperty({
    description: 'channel image',
    example: 'http://example.com/profile.jpg',
  })  
  @IsUrl()
  @IsOptional()
  ChannelImageURL?: string;
}
