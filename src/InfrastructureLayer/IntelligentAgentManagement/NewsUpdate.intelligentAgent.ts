import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { UpdateNewsWithSuggestionsDto, UpdatedNewsResponseDto } from './DTO.IntelligentAgent/NewsUpdate/UpdateNewsWithSuggestionsDto';
import { INewsUpdateIntelligentAgent } from './Interfaces/NewsUpdate.intelligentAgent.interface';


@Injectable()
export class NewsUpdateIntelligentAgent implements INewsUpdateIntelligentAgent{
  private readonly updateAgentUrl = 'https://singular-deadly-ape.ngrok-free.app/webhook/057b1d6d-1d4d-4cf5-9e6e-99476150a075';

  async updateNewsContent(
    updateDto: UpdateNewsWithSuggestionsDto,
  ): Promise<UpdatedNewsResponseDto> {
    try {
      const response = await axios.post<UpdatedNewsResponseDto>(
        this.updateAgentUrl,
        updateDto,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 60000,
        },
      );

      return response.data;
    } catch (error) {
      console.error('❌ Error al actualizar la noticia mediante IA:', error.message);
      throw new HttpException(
        'No se pudo actualizar el contenido de la noticia con el agente inteligente',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
