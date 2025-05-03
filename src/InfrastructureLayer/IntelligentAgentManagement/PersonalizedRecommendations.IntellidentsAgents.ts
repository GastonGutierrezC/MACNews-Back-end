import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { RecommendationAgentResponse } from './DTO.IntelligentAgent/PersonalizedRecommendations/agent-response.dto';

@Injectable()
export class PersonalizedRecommendationsAgent {
  private readonly agentUrl = 'https://enjoyed-busy-scorpion.ngrok-free.app/webhook/41f25aa9-6c64-4697-ac94-b9ac048b0b44';

  async getRecommendations(userId: string): Promise<RecommendationAgentResponse> {
    try {
      const response = await axios.get<RecommendationAgentResponse>(this.agentUrl, {
        data: { UserID: userId },
        headers: { 'Content-Type': 'application/json' },
      });

      if (
        !response.data ||
        !response.data.sugerencias ||
        !Array.isArray(response.data.sugerencias)
      ) {
        console.warn('⚠️ Formato inesperado recibido del agente. Retornando lista vacía.');
        return { sugerencias: [] };
      }

      return response.data;
    } catch (error) {
      console.error('❌ Error al comunicarse con el agente de recomendaciones:', error.message);
      throw new HttpException(
        'No se pudo obtener recomendaciones del agente inteligente',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
