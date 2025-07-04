export class TopInterest {
  interest: string;
  percentage: number;
}

export class InterestAnalysisResponse {
  TopInterests: TopInterest[];  
  Observation: string;        
}

export type AgentResponse = InterestAnalysisResponse;
