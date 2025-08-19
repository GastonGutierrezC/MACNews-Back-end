import { Inject, Injectable } from '@nestjs/common';
import { UserPendingApplicationDto } from 'src/ApplicationLayer/dto/ReportsDTOs/user-pending-applications.dto';
import { IApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/Interface/applicationForm.repository.interface';
import { IJournalistRepository } from 'src/InfrastructureLayer/Repositories/Interface/journalist.repository.interface';


@Injectable()
export class GetPendingApplicationsService {
  constructor(
    @Inject('IApplicationFormRepository')
    private readonly applicationFormRepository: IApplicationFormRepository,
    @Inject('IJournalistRepository')
    private readonly journalistRepository: IJournalistRepository,
  ) {}

  async execute(): Promise<UserPendingApplicationDto[]> {
    const allApplications = await this.applicationFormRepository.findAll();
    const allJournalists = await this.journalistRepository.findAll();

    // Filtrar solo usuarios que NO son periodistas
    const journalistUserIds = allJournalists.map(j => j.User.UserID);

    // Filtrar solicitudes Rechazadas o en Revisión
    const filteredApplications = allApplications
      .filter(app => 
        (app.VerificationStatus === 'Rejected' || app.VerificationStatus === 'Checking') &&
        !journalistUserIds.includes(app.User.UserID)
      )
      // Para cada usuario tomar la última solicitud enviada
      .reduce((acc, current) => {
        const existing = acc.find(a => a.User.UserID === current.User.UserID);
        if (!existing || new Date(existing.ApplicationDate) < new Date(current.ApplicationDate)) {
          if (existing) acc = acc.filter(a => a.User.UserID !== current.User.UserID);
          acc.push(current);
        }
        return acc;
      }, [] as typeof allApplications);

    // Mapear al DTO
    return filteredApplications.map(app => 
      new UserPendingApplicationDto({
        userId: app.User.UserID,
        aplicationId: app.ApplicationFormID,
        fullName: `${app.User.UserFirstName} ${app.User.UserLastName}`,
        email: app.User.UserEmail,
        birthDate: app.BirthDate,
        cardNumber: app.CardNumber,
        reason: app.Reason,
        imageCertificateURL: app.ImageCertificateURL,
        verificationStatus: app.VerificationStatus,
        applicationDate: app.ApplicationDate,
      })
    );
  }
}
