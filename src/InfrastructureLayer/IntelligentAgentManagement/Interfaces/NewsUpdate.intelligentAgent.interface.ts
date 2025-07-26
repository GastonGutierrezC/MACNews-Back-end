
import { CreateNewsDto } from 'src/ApplicationLayer/dto/NewsDTOs/create-news.dto';
import { AgentResponse } from '../DTO.IntelligentAgent/NewsReview/agent-response.dto';
import { UpdatedNewsResponseDto, UpdateNewsWithSuggestionsDto } from '../DTO.IntelligentAgent/NewsUpdate/UpdateNewsWithSuggestionsDto';

export interface INewsUpdateIntelligentAgent{
  updateNewsContent(updateDto: UpdateNewsWithSuggestionsDto): Promise<UpdatedNewsResponseDto> ;
}
