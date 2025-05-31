import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { CreateNewsDto } from '../../dto/NewsDTOs/create-news.dto';
import { NewsDocumentDto } from '../../dto/NewsDTOs/news-document.dto';
import { INewsRepository } from 'src/InfrastructureLayer/Repositories/Interface/news.repository.interface';
import { IChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/channel.repository.interface';
import { INewsReviewIntelligentAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/Interfaces/newsReview.intelligentAgent.interface';
import { IElasticsearchService } from 'src/InfrastructureLayer/ElasticsearchConnection/Interfaces/elasticsearchService.elasticsearch.interface';


@Injectable()
export class CreateNewsService {
  constructor(
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
    @Inject('IChannelRepository')
    private readonly channelRepository: IChannelRepository,
    @Inject('INewsReviewIntelligentAgent')
    private readonly newsReviewAgent: INewsReviewIntelligentAgent,
    @Inject('IElasticsearchService')
    private readonly elasticsearchService: IElasticsearchService,
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<boolean> {
    const channel = await this.channelRepository.findById(createNewsDto.ChannelID);
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${createNewsDto.ChannelID} not found`);
    }

    const aiReview = await this.newsReviewAgent.sendNewsForReview(createNewsDto);

    if ('violations' in aiReview && !aiReview.compliance) {
      throw new UnprocessableEntityException({
        message: 'La noticia no cumple con los principios éticos.',
        violations: aiReview.violations,
      });
    }

    const newsDocument: NewsDocumentDto = {
      Title: createNewsDto.Title,
      ShortDescription: createNewsDto.ShortDescription,
      PublicationDate: createNewsDto.PublicationDate,
      NewsImageURL: createNewsDto.NewsImageURL,
      Categories: createNewsDto.Categories,
      Channel: {
        ChannelID: channel.ChannelID,
        ChannelName: channel.ChannelName,
        ChannelImageURL: channel.ChannelImageURL,
      },
    };

    const news = await this.newsRepository.create({
      ...createNewsDto,
      Channel: channel,
    });

    try {
      await this.elasticsearchService.indexDocument('news', news.NewsId, newsDocument);
      console.log('Noticia indexada en Elasticsearch');
    } catch (error) {
      console.error('Error al indexar noticia en Elasticsearch:', error);
    }

    return true;
  }
}
