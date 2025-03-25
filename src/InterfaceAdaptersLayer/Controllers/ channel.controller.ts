import { Controller, Get, Post, Patch, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/create-channel.dto';
import { UpdateChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/update-channel.dto';
import { CreateChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/create.channel';
import { FindChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/find.channel';
import { UpdateChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/update.channel';
import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';

@Controller('channels')
export class ChannelController {
  constructor(
    private readonly createChannelService: CreateChannelService,
    private readonly findChannelService: FindChannelService,
    private readonly updateChannelService: UpdateChannelService,
  
  ) {}

  @Get(':id')
  async getChannelById(@Param('id') ChannelID: string): Promise<ChannelEntity> {
    const channel = await this.findChannelService.findById(ChannelID);
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${ChannelID} not found.`);
    }
    return channel;
  }

  @Post()
  async createChannel(@Body() createChannelDto: CreateChannelDto): Promise<ChannelEntity> {
    try {
      return await this.createChannelService.create(createChannelDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async updateChannel(@Param('id') ChannelID: string, @Body() updateChannelDto: UpdateChannelDto): Promise<ChannelEntity> {
    return await this.updateChannelService.update(ChannelID, updateChannelDto);
  }
}
