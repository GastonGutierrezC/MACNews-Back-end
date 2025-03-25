import { Controller, Get, Post, Patch, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/create-channel.dto';
import { UpdateChannelDto } from 'src/ApplicationLayer/dto/ChannelDTOs/update-channel.dto';
import { CreateChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/create.channel';
import { FindChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/find.channel';
import { UpdateChannelService } from 'src/ApplicationLayer/UseCases/ChannelUseCases/update.channel';
import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';

@ApiTags('Channels')
@Controller('channels')
export class ChannelController {
  constructor(
    private readonly createChannelService: CreateChannelService,
    private readonly findChannelService: FindChannelService,
    private readonly updateChannelService: UpdateChannelService,
  
  ) {}


  @Get(':id')
  @ApiOperation({ summary: 'Get channel by ID' })

  async getChannelById(@Param('id') ChannelID: string): Promise<ChannelEntity> {
    const channel = await this.findChannelService.findById(ChannelID);
    return channel;
  }

  @Post()
  @ApiOperation({ summary: 'create Channel' })
  @ApiBody({
    type: CreateChannelDto,
  })    
  async createChannel(@Body() createChannelDto: CreateChannelDto): Promise<ChannelEntity> {
    try {
      return await this.createChannelService.create(createChannelDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'update channel data' })
  @ApiBody({
    type: UpdateChannelDto, 
  })  
  @Patch(':id')
  async updateChannel(@Param('id') ChannelID: string, @Body() updateChannelDto: UpdateChannelDto): Promise<ChannelEntity> {
    return await this.updateChannelService.update(ChannelID, updateChannelDto);
  }
}
