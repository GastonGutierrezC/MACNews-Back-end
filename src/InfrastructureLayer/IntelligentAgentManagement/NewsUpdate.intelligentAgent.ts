import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { UpdateNewsWithSuggestionsDto, UpdatedNewsResponseDto } from './DTO.IntelligentAgent/NewsUpdate/UpdateNewsWithSuggestionsDto';
import { INewsUpdateIntelligentAgent } from './Interfaces/NewsUpdate.intelligentAgent.interface';


@Injectable()
export class NewsUpdateIntelligentAgent implements INewsUpdateIntelligentAgent{
  private readonly updateAgentUrl = 'https://n8n-y7dx.onrender.com/webhook/65e502b8-086a-493b-9d90-a6c20d9a6d8e';

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
