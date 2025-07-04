import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCommentPostDto {
  


  @ApiProperty({
    description: 'ID of the channel where the comment is posted',
    example: 'ID of the channel ',
  })
  @IsUUID()
  @IsNotEmpty()
  ChannelID: string;

  @ApiProperty({
    description: 'ID of the parent comment if it is a reply',
    example: 'null',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  ParentComment: string | null;

  @ApiProperty({
    description: 'Text content of the comment',
    example: 'This is a great post!',
  })
  @IsString()
  @IsNotEmpty()
  TextComment: string;
}
