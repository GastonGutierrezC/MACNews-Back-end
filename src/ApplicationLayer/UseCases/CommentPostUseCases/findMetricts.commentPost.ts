import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AgentResponse } from 'src/InfrastructureLayer/IntelligentAgentManagement/DTO.IntelligentAgent/NewsReview/agent-response.dto';
import { IInterestAnalysisAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/Interfaces/CommentPostMetrics.intelligentAgent.interface';
import { ICommentPostRepository } from 'src/InfrastructureLayer/Repositories/Interface/commentPost.repository.interface';

@Injectable()
export class FindChannelMetricsService {
  constructor(
    @Inject('ICommentPostRepository')
    private readonly commentPostRepository: ICommentPostRepository,
    @Inject('IInterestAnalysisAgent')
    private readonly interestAnalysisAgent: IInterestAnalysisAgent,
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
