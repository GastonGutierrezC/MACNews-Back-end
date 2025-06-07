// update-channel-metrics.dto.ts
import { IsArray, IsString } from 'class-validator';

export class InterestDto {
  @IsString()
  interest: string;

  // porcentaje como número (puede ser number)
  percentage: number;
}

export class UpdateChannelMetricsDto {
  @IsString()
  ChannelID: string;

  @IsArray()
  TopInterests: InterestDto[];

  @IsString()
  Observation: string;
}
