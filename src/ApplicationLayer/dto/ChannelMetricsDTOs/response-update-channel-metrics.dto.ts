// src/ApplicationLayer/dto/ChannelMetricsDTOs/response-update-channel-metrics.dto.ts

import { InterestDto } from "./update-channel-metrics.dto";


export class ResponseUpdateChannelMetricsDto {
  TopInterests: InterestDto[];
  Observation: string;
}
