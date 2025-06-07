import { IsUUID, IsNotEmpty, IsString, IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class InterestDto {
  @IsString()
  interest: string;

  @IsNumber()
  percentage: number;
}

export class CreateChannelMetricsDto {
  @IsUUID()
  @IsNotEmpty()
  ChannelID: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterestDto)
  top_interests: InterestDto[];

  @IsString()
  @IsNotEmpty()
  observation: string;
}
