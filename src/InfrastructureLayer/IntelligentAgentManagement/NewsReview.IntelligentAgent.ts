import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { CreateNewsDto } from 'src/ApplicationLayer/dto/NewsDTOs/create-news.dto';
import { AgentResponse } from './DTO.IntelligentAgent/NewsReview/agent-response.dto';

@Injectable()
export class NewsReviewIntelligentAgent {
  private readonly agentUrl = 'http://localhost:5678/webhook/a5c159fc-8c26-4a69-8912-98f29a1b1913';

  async sendNewsForReview(newsDto: CreateNewsDto): Promise<AgentResponse> {
    try {
      const response = await axios.post<AgentResponse>(this.agentUrl, newsDto, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000,
      });

      return response.data;
    } catch (error) {
      console.error('❌ Error al comunicarse con el agente:', error.message);
      throw new HttpException(
        'No se pudo enviar la noticia al agente inteligente',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
