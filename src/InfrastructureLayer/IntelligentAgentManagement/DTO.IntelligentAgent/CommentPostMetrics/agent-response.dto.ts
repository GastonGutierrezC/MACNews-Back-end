export class TopInterest {
    interest: string;
    percentage: number;
  }
  
  export class InterestAnalysisResponse {
    top_interests: TopInterest[];
    observation: string;
  }
  
  export type AgentResponse = InterestAnalysisResponse;
  