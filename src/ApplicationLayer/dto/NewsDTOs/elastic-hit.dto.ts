import { NewsDocumentDto } from './news-document.dto';

export class ElasticHitDto {
  _index: string;
  _id: string;
  _score: number;
  _source: NewsDocumentDto;
}
