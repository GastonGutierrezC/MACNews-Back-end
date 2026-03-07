// src/ApplicationLayer/dto/ReportsDTOs/news-review-report.dto.ts
export class NewsReviewReportDto {
  totalReviewed: number;
  totalApproved: number;
  totalRejected: number;

  constructor(partial: Partial<NewsReviewReportDto>) {
    Object.assign(this, partial);
  }
}
