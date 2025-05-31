import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ChannelInfoDto } from 'src/ApplicationLayer/dto/ChannelDTOs/channel-info.dto';
import { ChannelWithCreatorNameDto } from 'src/ApplicationLayer/dto/ChannelDTOs/channel-with-creator-name.dto';
import { CreateChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/create-channel.dto';
import { UpdateChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/update-channel.dto';
import { TopChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/top-channel.dto';

import { CreateChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/create.channel';
import { FindChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/find.channel';
import { UpdateChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/update.channel';

import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';
import { ChannelInfoJournalistDto } from 'src/ApplicationLayer/dto/ChannelDTOs/channel-info-jounalist.dto';

@ApiTags('Channels')
@Controller('channels')
export class ChannelController {
  constructor(
    private readonly createChannelService: CreateChannelService,
    private readonly findChannelService: FindChannelService,
    private readonly updateChannelService: UpdateChannelService,
  ) {}

  @Get('by-channel-name-and-creator')
  @ApiOperation({ summary: 'Get channel by channel name and creator full name' })
  async findByChannelNameAndCreator(
    @Query('channelName') channelName: string,
    @Query('creatorFullName') creatorFullName: string,
  ): Promise<ChannelInfoJournalistDto> {
    return this.findChannelService.findByChannelNameAndCreator(channelName, creatorFullName);
  }
  

  @Get('top')
  @ApiOperation({ summary: 'Get top 5 channels with most followers' })
  async getTop5ChannelsByFollowers(): Promise<TopChannelDto[]> {
    return await this.findChannelService.findTop5ChannelsByFollowers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get channel by ID' })
  async getChannelById(@Param('id') ChannelID: string): Promise<ChannelInfoDto> {
    const channel = await this.findChannelService.findById(ChannelID);
    return channel;
  }

  @Get('journalist/:journalistId')
  @ApiOperation({ summary: 'Get channel by Journalist ID' })
  async getChannelByJournalistId(
    @Param('journalistId') journalistId: string,
  ): Promise<ChannelInfoDto> {
    return await this.findChannelService.findByJournalistId(journalistId);
  }

  @Post()
  @ApiOperation({ summary: 'Create Channel' })
  @ApiBody({ type: CreateChannelDto })
  async createChannel(
    @Body() createChannelDto: CreateChannelDto,
  ): Promise<ChannelEntity> {
    try {
      return await this.createChannelService.create(createChannelDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update channel data' })
  @ApiBody({ type: UpdateChannelDto })
  async updateChannel(
    @Param('id') ChannelID: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ): Promise<ChannelEntity> {
    return await this.updateChannelService.update(ChannelID, updateChannelDto);
  }
}
