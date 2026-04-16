import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { AgentResponse } from './DTO.IntelligentAgent/CommentPostMetrics/agent-response.dto';
import { IInterestAnalysisAgent } from './Interfaces/CommentPostMetrics.intelligentAgent.interface';

@Injectable()
export class InterestAnalysisAgent implements IInterestAnalysisAgent{
  private readonly agentUrl = 'https://n8n-y7dx.onrender.com/webhook/52e147df-d945-43f8-b5c5-eb2ee1e70e8b';

  async analyzeChannelInterests(channelID: string): Promise<AgentResponse> {
    try {
      const response = await axios.get<AgentResponse>(this.agentUrl, {
        headers: { 'Content-Type': 'application/json' },
        data: {
          ChannelID: channelID,
        },
      });

      return response.data;
    } catch (error) {
      console.error('❌ Error communicating with the interest analysis agent:', error.message);
      throw new HttpException(
        'Could not send channel data to the intelligent agent',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
