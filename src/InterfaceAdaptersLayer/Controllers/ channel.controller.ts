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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

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
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';
import { ActiveUser } from 'src/ApplicationLayer/decorators/active-user.decorator';
import { ActiveJournalistInterface, ActiveUserInterface } from 'src/ApplicationLayer/decorators/active-user.interface';

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


  @Get('journalist')
  @ApiOperation({ summary: 'Get channel by Journalist ID' })
      @Auth(RoleAssigned.Journalist)
  @ApiBearerAuth('access-token')
  async getChannelByJournalistId(
   @ActiveUser() user: ActiveJournalistInterface,
  ): Promise<ChannelInfoDto> {
    return await this.findChannelService.findByJournalistId(user.journalistID);
  }

  @Post()
  @ApiOperation({ summary: 'Create Channel' })
    @Auth(RoleAssigned.Journalist)
  @ApiBearerAuth('access-token')
  @ApiBody({ type: CreateChannelDto })
  async createChannel(
    @Body() createChannelDto: CreateChannelDto,
    @ActiveUser() user: ActiveJournalistInterface,
  ): Promise<ChannelEntity> {
    try {
      return await this.createChannelService.create(createChannelDto, user.journalistID);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update channel data' })
  @Auth([RoleAssigned.Administrator, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiBody({ type: UpdateChannelDto })
  async updateChannel(
    @Param('id') ChannelID: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ): Promise<ChannelEntity> {
    return await this.updateChannelService.update(ChannelID, updateChannelDto);
  }
}
