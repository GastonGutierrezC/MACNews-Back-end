import { ElasticHitDto } from './elastic-hit.dto';

export class ElasticSearchResponseDto {
  hits: {
    hits: ElasticHitDto[];
  };
}
