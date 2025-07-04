import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateApplicationFormIADto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm-IA.dto';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
import { ApplicationAgentResponse } from 'src/InfrastructureLayer/IntelligentAgentManagement/DTO.IntelligentAgent/JurnalistApplications/agent-response.dto';
import { IJournalistApplicationsIntelligentAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/Interfaces/journalistApplications.intelligentAgent.interface';
import { IApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/Interface/applicationForm.repository.interface';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';



@Injectable()
export class CreateApplicationFormService {
  constructor(
    @Inject('IApplicationFormRepository')
    private readonly applicationFormRepository: IApplicationFormRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IJournalistApplicationsIntelligentAgent')
    private readonly intelligentAgent: IJournalistApplicationsIntelligentAgent,
  ) {}

  async create(createApplicationFormDto: CreateApplicationFormDto): Promise<ApplicationFormEntity> {
    const user = await this.userRepository.findById(createApplicationFormDto.UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const applicationForm = await this.applicationFormRepository.create({
      ...createApplicationFormDto,
      User: user,
    });

    return applicationForm;
  }


  async evaluateWithAgent(createApplicationFormDto: CreateApplicationFormIADto, UserID:string): Promise<ApplicationAgentResponse> {
    const user = await this.userRepository.findById(UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const agentPayload = {
      UserID: UserID,
      BirthDate: createApplicationFormDto.BirthDate,
      CardNumber: createApplicationFormDto.CardNumber,
      Reason: createApplicationFormDto.Reason,
      ImageCertificateURL: createApplicationFormDto.ImageCertificateURL,
    };

    const agentResponse = await this.intelligentAgent.sendApplicationToAgent(agentPayload);

    return agentResponse;
  }
}

