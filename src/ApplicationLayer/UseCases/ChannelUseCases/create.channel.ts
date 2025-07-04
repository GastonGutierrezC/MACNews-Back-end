import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';
import { CreateChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/create-channel.dto';
import { IJournalistRepository } from 'src/InfrastructureLayer/Repositories/Interface/journalist.repository.interface';
import { IChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/channel.repository.interface';
import { CreateChannelMetricsService } from 'src/ApplicationLayer/UseCases/ChannelMetricsUseCases/create-channel-metrics.service';

@Injectable()
export class CreateChannelService {
  constructor(
    @Inject('IJournalistRepository')
    private readonly journalistRepository: IJournalistRepository,

    @Inject('IChannelRepository')
    private readonly channelRepository: IChannelRepository,

    private readonly createChannelMetricsService: CreateChannelMetricsService,  // <-- Inyectamos el servicio
  ) {}

  async create(createChannelDto: CreateChannelDto, JournalistID : string): Promise<ChannelEntity> {
    const journalist = await this.journalistRepository.findById(JournalistID);
    if (!journalist) {
      throw new NotFoundException('Journalist not found.');
    }

    const allChannels = await this.channelRepository.findAll();
    const existingChannel = allChannels.find(
      (channel) => channel.Journalist.JournalistID === JournalistID,
    );

    if (existingChannel) {
      throw new BadRequestException('Journalist already has a channel.');
    }

    // Creamos el canal
    const channel = await this.channelRepository.create({
      ...createChannelDto,
      Journalist: journalist,
    });

    // Creamos las métricas asociadas con valores vacíos
    await this.createChannelMetricsService.create({
      ChannelID: channel.ChannelID,
      top_interests: [],    // arreglo vacío en lugar de string
      observation: '',
    });

    return channel;
  }
}
