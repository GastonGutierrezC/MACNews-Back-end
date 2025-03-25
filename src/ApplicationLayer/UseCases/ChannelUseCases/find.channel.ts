import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';

import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';

@Injectable()
export class FindChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
  ) {}


  async findById(ChannelID: string): Promise<ChannelEntity> {
    const channel = await this.channelRepository.findById(ChannelID);
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${ChannelID} not found.`);
    }
    return channel;
  }


}
