import { Injectable, NotFoundException } from '@nestjs/common';
import { InterestAnalysisAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/CommentPostMetrics.intelligentAgent';
import { AgentResponse } from 'src/InfrastructureLayer/IntelligentAgentManagement/DTO.IntelligentAgent/NewsReview/agent-response.dto';
import { CommentPostRepository } from 'src/InfrastructureLayer/Repositories/commentPost.repository';

@Injectable()
export class FindChannelMetricsService {
  constructor(
    private readonly commentPostRepository: CommentPostRepository,
    private readonly interestAnalysisAgent: InterestAnalysisAgent,
  ) {}

  async execute(ChannelID: string): Promise<AgentResponse> {
    const allComments = await this.commentPostRepository.findAll();

    const channelComments = allComments.filter(
      (comment) => comment.Channel?.ChannelID === ChannelID,
    );

    if (channelComments.length === 0) {
      throw new NotFoundException(`No comments found for channel with ID ${ChannelID}.`);
    }

    const agentResponse = await this.interestAnalysisAgent.analyzeChannelInterests(ChannelID);

    return agentResponse;
  }
}
