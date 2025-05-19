import { ElasticSearchResponseDto } from "src/ApplicationLayer/dto/NewsDTOs/elastic-search-response.dto";
import { NewsDocumentDto } from "src/ApplicationLayer/dto/NewsDTOs/news-document.dto";


export interface IElasticsearchService {
  indexDocument(index: string, id: string, document: NewsDocumentDto): Promise<void>;
  phrasePrefixSearch(index: string, text: string): Promise<ElasticSearchResponseDto>;
  mostFieldsSearch(index: string, text: string): Promise<ElasticSearchResponseDto>;
}
