
import { CreateNewsDto } from 'src/ApplicationLayer/dto/NewsDTOs/create-news.dto';
import { AgentResponse } from '../DTO.IntelligentAgent/NewsReview/agent-response.dto';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { ApplicationAgentResponse } from '../DTO.IntelligentAgent/JurnalistApplications/agent-response.dto';

export interface IJournalistApplicationsIntelligentAgent {
  sendApplicationToAgent(payload: CreateApplicationFormDto): Promise<ApplicationAgentResponse>;
}
