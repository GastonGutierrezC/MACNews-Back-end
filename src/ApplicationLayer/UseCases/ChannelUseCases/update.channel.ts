import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { UpdateChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/update-channel.dto';

@Injectable()
export class UpdateChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
  ) {}



  async update(ChannelID: string, updateChannelDto: UpdateChannelDto): Promise<ChannelEntity> {
    const channel = await this.channelRepository.findById(ChannelID);
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${ChannelID} not found.`);
    }

    await this.channelRepository.update(ChannelID, updateChannelDto);
    return { ...channel, ...updateChannelDto };
  }
}
