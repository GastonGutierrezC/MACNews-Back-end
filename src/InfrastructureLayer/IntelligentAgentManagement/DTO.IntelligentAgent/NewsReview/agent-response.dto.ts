export interface ComplianceOnlyResponse {
  compliance: true;
}

export interface ViolationDetail {
  principle: string;
  explanation: string;
  suggestion: string;
}

export interface NonComplianceResponse {
  compliance: false;
  violated_principles: ViolationDetail[];
}

export type AgentResponse = ComplianceOnlyResponse | NonComplianceResponse;

