import { VerificationStatus } from "src/DomainLayer/Entities/applicationForm.entity";

export class UserPendingApplicationDto {
  userId: string;
  aplicationId: string;
  fullName: string;
  email: string;
  birthDate: string;
  cardNumber: string;
  reason: string;
  imageCertificateURL?: string;
  verificationStatus: VerificationStatus;
  applicationDate: string;

  constructor(partial: Partial<UserPendingApplicationDto>) {
    Object.assign(this, partial);
  }
}
