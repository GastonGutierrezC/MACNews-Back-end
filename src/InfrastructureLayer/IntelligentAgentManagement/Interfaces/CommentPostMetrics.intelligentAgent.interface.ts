
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { ApplicationAgentResponse } from '../DTO.IntelligentAgent/JurnalistApplications/agent-response.dto';
import { AgentResponse } from '../DTO.IntelligentAgent/NewsReview/agent-response.dto';

export interface IInterestAnalysisAgent {
  analyzeChannelInterests(channelID: string): Promise<AgentResponse>;
}
