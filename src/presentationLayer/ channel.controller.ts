import { Controller, Get, Post, Patch, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateChannelDto } from 'src/businessLayer/dto/Channel/create-channel.dto';
import { UpdateChannelDto } from 'src/businessLayer/dto/Channel/update-channel.dto';
import { ChannelService } from 'src/businessLayer/servies/channel.service';
import { ChannelEntity } from 'src/dataLayer/entities/channel.entity';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get(':id')
  async getChannelById(@Param('id') ChannelID: string): Promise<ChannelEntity> {
    const channel = await this.channelService.findById(ChannelID);
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${ChannelID} not found.`);
    }
    return channel;
  }

  @Post()
  async createChannel(@Body() createChannelDto: CreateChannelDto): Promise<ChannelEntity> {
    try {
      return await this.channelService.create(createChannelDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async updateChannel(@Param('id') ChannelID: string, @Body() updateChannelDto: UpdateChannelDto): Promise<ChannelEntity> {
    return await this.channelService.update(ChannelID, updateChannelDto);
  }
}
