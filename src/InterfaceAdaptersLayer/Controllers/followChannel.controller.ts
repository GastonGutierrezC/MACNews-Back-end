import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFollowChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/create-followChannel.dto';
import { UpdateFollowChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/update-followChannel.dto';
import { CreateFollowChannelService } from 'src/ApplicationLayer/UseCases/FollowChannelUseCases/create.followChannel';
import { FindFollowChannelService } from 'src/ApplicationLayer/UseCases/FollowChannelUseCases/find.followChannel';
import { UpdateFollowChannelService } from 'src/ApplicationLayer/UseCases/FollowChannelUseCases/update.followChannel';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';

@ApiTags('FollowChannels')
@Controller('followChannels')
export class FollowChannelController {
  constructor(
    private readonly createFollowChannelService: CreateFollowChannelService,
    private readonly updateFollowChannelService: UpdateFollowChannelService,
    private readonly getFollowChannelService: FindFollowChannelService,  
  ) {}

  @Post()
  @ApiOperation({ summary: 'create follow Channel' })
  @ApiBody({
    type: CreateFollowChannelDto,
  })    
  async createChannel(@Body() createFollowChannelDto: CreateFollowChannelDto): Promise<FollowChannelEntity> {
    return await this.createFollowChannelService.create(createFollowChannelDto);
  }

  @ApiOperation({ summary: 'update follow channel data' })
  @ApiBody({
    type: UpdateFollowChannelDto, 
  })  
  @Patch(':id')
  async updateChannel(@Param('id') ChannelID: string, @Body() updateFollowChannelDto: UpdateFollowChannelDto): Promise<FollowChannelEntity> {
    return await this.updateFollowChannelService.update(ChannelID, updateFollowChannelDto);
  }  

  @Get(':id')
  @ApiOperation({ summary: 'Get follow channel by ID' })
  async getFollowChannelById(@Param('id') FollowChannelID: string): Promise<FollowChannelEntity> {
    return await this.getFollowChannelService.getById(FollowChannelID);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all followed channels by a user' })
  async getFollowedChannelsByUser(@Param('userId') UserID: string): Promise<FollowChannelEntity[]> {
    return await this.getFollowChannelService.getByUserId(UserID);
  }
}
