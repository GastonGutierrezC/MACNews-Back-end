export interface ApplicationAgentResponse {
    ApplicationFormID: string;
    BirthDate: string; 
    CardNumber: string;
    Reason: string;
    ImageCertificateURL: string;
    VerificationStatus: 'Checking' | 'Approved' | 'Rejected'; 
    ApplicationDate: string; 
  }
  