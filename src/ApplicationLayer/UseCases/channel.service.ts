import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';
import { ChannelRepository } from 'src/InfrastructureLayer/Repositories/channel.repository';
import { CreateChannelDto } from '../dto/ChannelDTOs/create-channel.dto';
import { UpdateChannelDto } from '../dto/ChannelDTOs/update-channel.dto';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';

@Injectable()
export class ChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    private readonly journalistRepository: ApplicationFormRepository,
  ) {}

  async create(createChannelDto: CreateChannelDto): Promise<ChannelEntity> {
    const existingChannel = await this.channelRepository.findByJournalistId(createChannelDto.JournalistID);
    if (existingChannel) {
      throw new BadRequestException('This journalist already has a channel.');
    }
  
    const journalist = await this.journalistRepository.findById(createChannelDto.JournalistID);
    if (!journalist) {
      throw new NotFoundException('Journalist not found.');
    }
  
    if (journalist.VerificationStatus !== 'Approved') {
      throw new BadRequestException('Journalist must be approved to create a channel.');
    }
  
    const channel = this.channelRepository.create({
      ...createChannelDto,
      Journalist: journalist,
    });
  
    return channel;
  }
  

  async findById(ChannelID: string): Promise<ChannelEntity> {
    const channel = await this.channelRepository.findById(ChannelID);
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${ChannelID} not found.`);
    }
    return channel;
  }

  async update(ChannelID: string, updateChannelDto: UpdateChannelDto): Promise<ChannelEntity> {
    const channel = await this.findById(ChannelID);

    await this.channelRepository.update(ChannelID, updateChannelDto);
    return { ...channel, ...updateChannelDto };
  }
}
