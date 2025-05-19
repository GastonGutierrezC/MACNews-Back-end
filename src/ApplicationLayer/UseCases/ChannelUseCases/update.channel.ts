import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';
import { UpdateChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/update-channel.dto';
import { IChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/channel.repository.interface';

@Injectable()
export class UpdateChannelService {
  constructor(
    @Inject('IChannelRepository')
    private readonly channelRepository: IChannelRepository, 

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
