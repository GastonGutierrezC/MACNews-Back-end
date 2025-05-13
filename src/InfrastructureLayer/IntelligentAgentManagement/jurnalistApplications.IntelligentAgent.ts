import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ApplicationAgentResponse } from './DTO.IntelligentAgent/JurnalistApplications/agent-response.dto';
import { CreateApplicationFormDto } from 'src/ApplicationLayer/dto/ApplicationFormDTOs/create-applicationForm.dto';

@Injectable()
export class JournalistApplicationsIntelligentAgent {
  private readonly agentUrl = 'https://singular-deadly-ape.ngrok-free.app/webhook/b0f4a077-634c-40ae-b736-dddb2c1d004';

  async sendApplicationToAgent(payload: CreateApplicationFormDto): Promise<ApplicationAgentResponse> {
    try {
      const response = await axios.post<ApplicationAgentResponse>(this.agentUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 20000, // Esperar hasta 20 segundos
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
        console.error('⏳ Timeout: el agente tardó demasiado en responder');
        throw new HttpException(
          'El agente inteligente tardó demasiado en responder',
          HttpStatus.GATEWAY_TIMEOUT,
        );
      }


      console.error('❌ Error al comunicarse con el agente de aplicaciones:', error.message);
      throw new HttpException(
        'No se pudo enviar la solicitud de periodista al agente inteligente',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}

