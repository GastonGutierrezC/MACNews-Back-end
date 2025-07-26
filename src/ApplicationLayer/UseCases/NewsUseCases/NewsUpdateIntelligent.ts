import { Inject, Injectable } from '@nestjs/common';
import { UpdateNewsWithSuggestionsDto, UpdatedNewsResponseDto } from 'src/InfrastructureLayer/IntelligentAgentManagement/DTO.IntelligentAgent/NewsUpdate/UpdateNewsWithSuggestionsDto';
import { INewsUpdateIntelligentAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/Interfaces/NewsUpdate.intelligentAgent.interface';
import { NewsUpdateIntelligentAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/NewsUpdate.intelligentAgent';

@Injectable()
export class NewsUpdateIntelligent {
  constructor(
    @Inject('INewsUpdateIntelligentAgent')
    private readonly intelligentAgent: INewsUpdateIntelligentAgent,
      
  ) {}

  async execute(updateDto: UpdateNewsWithSuggestionsDto): Promise<UpdatedNewsResponseDto> {

    return await this.intelligentAgent.updateNewsContent(updateDto);
  }
}
