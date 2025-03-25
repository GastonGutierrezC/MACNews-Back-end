import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { CreateChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/create-channel.dto';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';

@Injectable()
export class CreateChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    private readonly journalistRepository: JournalistRepository,
  ) {}

  async create(createChannelDto: CreateChannelDto): Promise<ChannelEntity> {

  
    const journalist = await this.journalistRepository.findById(createChannelDto.JournalistID);
    if (!journalist) {
      throw new NotFoundException('Journalist not found.');
    }

    const allChannels = await this.channelRepository.findAll();
    const existingChannel = allChannels.find(channel => channel.Journalist.JournalistID === createChannelDto.JournalistID);
    
    if (existingChannel) {
      throw new BadRequestException('Journalist already has a channel.');
    }
  
  
    const channel = this.channelRepository.create({
      ...createChannelDto,
      Journalist: journalist,
    });
  
    return channel;
  }
  

}
