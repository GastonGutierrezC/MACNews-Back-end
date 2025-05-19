
import { CreateNewsDto } from 'src/ApplicationLayer/dto/NewsDTOs/create-news.dto';
import { AgentResponse } from '../DTO.IntelligentAgent/NewsReview/agent-response.dto';

export interface INewsReviewIntelligentAgent {
  sendNewsForReview(newsDto: CreateNewsDto): Promise<AgentResponse>;
}
