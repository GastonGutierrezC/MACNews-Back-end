export class ChannelMetricsResponseDto {
  MetricID: string;
  ChannelID: string;
  TopInterests: { interest: string; percentage: number }[];
  Observation: string;
  AnalysisDate: Date;
}
