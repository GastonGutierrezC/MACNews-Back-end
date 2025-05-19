
import { RecommendationAgentResponse } from '../DTO.IntelligentAgent/PersonalizedRecommendations/agent-response.dto';

export interface IPersonalizedRecommendationsAgent {
  getRecommendations(userId: string): Promise<RecommendationAgentResponse>;
}
