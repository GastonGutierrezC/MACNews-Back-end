import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ChannelEntity } from 'src/dataLayer/entities/channel.entity';
import { ChannelRepository } from 'src/dataLayer/repositories/channel.repository';
import { CreateChannelDto } from '../dto/Channel/create-channel.dto';
import { UpdateChannelDto } from '../dto/Channel/update-channel.dto';
import { JournalistRepository } from 'src/dataLayer/repositories/journalist.repository';

@Injectable()
export class ChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    private readonly journalistRepository: JournalistRepository,
  ) {}

  async create(createChannelDto: CreateChannelDto): Promise<ChannelEntity> {
    // Verifica si el periodista ya tiene un canal
    const existingChannel = await this.channelRepository.findByJournalistId(createChannelDto.JournalistID);
    if (existingChannel) {
      throw new BadRequestException('This journalist already has a channel.');
    }
  
    // Busca el periodista por ID
    const journalist = await this.journalistRepository.findById(createChannelDto.JournalistID);
    if (!journalist) {
      throw new NotFoundException('Journalist not found.');
    }
  
    // Verifica si el estado de verificación del periodista es "Approved"
    if (journalist.VerificationStatus !== 'Approved') {
      throw new BadRequestException('Journalist must be approved to create a channel.');
    }
  
    // Crea el canal con los datos proporcionados
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
