// src/ApplicationLayer/UseCases/ReportsUseCases/get.news-review-report.ts
import { Inject, Injectable } from '@nestjs/common';
import { INewsRepository } from 'src/InfrastructureLayer/Repositories/Interface/news.repository.interface';
import { NewsStatus } from 'src/DomainLayer/Entities/news.entity';
import { NewsReviewReportDto } from 'src/ApplicationLayer/dto/ReportsDTOs/news-review-report.dto';

@Injectable()
export class GetNewsReviewReportService {
  constructor(
    @Inject('INewsRepository')
    private readonly newsRepository: INewsRepository,
  ) {}

  async execute(startDate: string, endDate: string): Promise<NewsReviewReportDto> {
    const allNews = await this.newsRepository.findAll();

    const filteredNews = allNews.filter(n => {
      const pubDate = new Date(n.PublicationDate);
      return pubDate >= new Date(startDate) && pubDate <= new Date(endDate);
    });

    const totalReviewed = filteredNews.length;
    const totalApproved = filteredNews.filter(n => n.NewsStatus === NewsStatus.Approved).length;
    const totalRejected = filteredNews.filter(n => n.NewsStatus === NewsStatus.Rejected).length;

    return new NewsReviewReportDto({
      totalReviewed,
      totalApproved,
      totalRejected,
    });
  }
}
