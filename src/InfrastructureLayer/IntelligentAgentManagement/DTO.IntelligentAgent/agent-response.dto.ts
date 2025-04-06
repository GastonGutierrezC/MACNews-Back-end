
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
    violations: ViolationDetail[];
  }
  
  export type AgentResponse = ComplianceOnlyResponse | NonComplianceResponse;
  