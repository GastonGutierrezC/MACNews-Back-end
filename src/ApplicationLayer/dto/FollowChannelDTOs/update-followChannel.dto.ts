import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFollowChannelDto {
  @ApiProperty({
    description: 'Indica si el usuario sigue el canal',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  readonly IsFollow: boolean;
}
