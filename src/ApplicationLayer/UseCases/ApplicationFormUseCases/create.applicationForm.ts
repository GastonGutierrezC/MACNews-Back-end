import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';
import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';
import { ApplicationAgentResponse } from 'src/InfrastructureLayer/IntelligentAgentManagement/DTO.IntelligentAgent/JurnalistApplications/agent-response.dto';
import { JournalistApplicationsIntelligentAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/jurnalistApplications.IntelligentAgent';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { UserRepository } from 'src/InfrastructureLayer/Repositories/user.repository';


@Injectable()
export class CreateApplicationFormService {
  constructor(
    private readonly applicationFormRepository: ApplicationFormRepository,
    private readonly userRepository: UserRepository, 
    private readonly intelligentAgent: JournalistApplicationsIntelligentAgent,
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


  async evaluateWithAgent(createApplicationFormDto: CreateApplicationFormDto): Promise<ApplicationAgentResponse> {
    const user = await this.userRepository.findById(createApplicationFormDto.UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const agentPayload = {
      UserID: createApplicationFormDto.UserID,
      BirthDate: createApplicationFormDto.BirthDate,
      CardNumber: createApplicationFormDto.CardNumber,
      Reason: createApplicationFormDto.Reason,
      ImageCertificateURL: createApplicationFormDto.ImageCertificateURL,
    };

    const agentResponse = await this.intelligentAgent.sendApplicationToAgent(agentPayload);

    return agentResponse;
  }
}

