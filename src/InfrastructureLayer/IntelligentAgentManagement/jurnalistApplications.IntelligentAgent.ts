import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ApplicationAgentResponse } from './DTO.IntelligentAgent/JurnalistApplications/agent-response.dto';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';


@Injectable()
export class JournalistApplicationsIntelligentAgent {
  private readonly agentUrl = 'http://localhost:5678/webhook/b0f4a077-634c-40ae-b736-dddb2c1d004d';

  async sendApplicationToAgent(payload: CreateApplicationFormDto): Promise<ApplicationAgentResponse> {
    try {
      const response = await axios.post<ApplicationAgentResponse>(this.agentUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      return response.data;
    } catch (error) {
      console.error('❌ Error al comunicarse con el agente de aplicaciones:', error.message);
      throw new HttpException(
        'No se pudo enviar la solicitud de periodista al agente inteligente',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
