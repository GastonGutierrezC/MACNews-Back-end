import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { NewsEntity } from 'src/DomainLayer/Entities/news.entity';
import { NewsRepository } from 'src/InfrastructureLayer/Repositories/news.repository';
import { CreateNewsDto } from '../../dto/NewsDTOs/create-news.dto';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';
import { NewsReviewIntelligentAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/NewsReview.IntelligentAgent';


@Injectable()
export class CreateNewsService {
  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly channelRepository: ChannelRepository,
    private readonly newsReviewAgent: NewsReviewIntelligentAgent,
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    const channel = await this.channelRepository.findById(createNewsDto.ChannelID);
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${createNewsDto.ChannelID} not found`);
    }

    const aiReview = await this.newsReviewAgent.sendNewsForReview(createNewsDto);

    if ('violations' in aiReview && !aiReview.compliance) {
      throw new BadRequestException({
        message: 'La noticia no cumple con los principios éticos.',
        violations: aiReview.violations,
      });
    }

    const news = await this.newsRepository.create({
      ...createNewsDto,
      Channel: channel,
    });

    return news;
  }
}
