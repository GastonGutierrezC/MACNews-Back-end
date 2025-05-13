import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ElasticSearchResponseDto } from 'src/ApplicationLayer/dto/NewsDTOs/elastic-search-response.dto';
import { NewsDocumentDto } from 'src/ApplicationLayer/dto/NewsDTOs/news-document.dto';

@Injectable()
export class ElasticsearchService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:9200';
  }

  async indexDocument(index: string, id: string, document: NewsDocumentDto): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/${index}/_doc/${id}`, document);
    } catch (error) {
      console.error('Error al indexar documento', error);
      throw error;
    }
  }

  async phrasePrefixSearch(index: string, text: string): Promise<ElasticSearchResponseDto> {
    const query = {
      query: {
        multi_match: {
          query: text,
          type: 'phrase_prefix',
          fields: ['Title', 'ShortDescription', 'Channel.ChannelName'],
        },
      },
    };

    try {
      const response = await axios.post<ElasticSearchResponseDto>(
        `${this.baseUrl}/${index}/_search?filter_path=hits.hits`,
        query
      );
      return response.data;
    } catch (error) {
      console.error('Error en phrasePrefixSearch', error);
      throw error;
    }
  }

  async mostFieldsSearch(index: string, text: string): Promise<ElasticSearchResponseDto> {
    const query = {
      query: {
        multi_match: {
          query: text,
          type: 'most_fields',
          fields: ['Title', 'ShortDescription', 'Channel.ChannelName'],
        },
      },
    };

    try {
      const response = await axios.post<ElasticSearchResponseDto>(
        `${this.baseUrl}/${index}/_search?filter_path=hits.hits`,
        query
      );
      return response.data;
    } catch (error) {
      console.error('Error en mostFieldsSearch', error);
      throw error;
    }
  }
}
