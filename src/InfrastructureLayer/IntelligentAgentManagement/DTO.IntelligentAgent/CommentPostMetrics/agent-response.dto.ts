export class TopInterest {
  interest: string;
  percentage: number;
}

export class InterestAnalysisResponse {
  TopInterests: TopInterest[];  // con mayúscula T y I para que coincida exactamente con el JSON recibido
  Observation: string;          // igual con mayúscula O
}

export type AgentResponse = InterestAnalysisResponse;
