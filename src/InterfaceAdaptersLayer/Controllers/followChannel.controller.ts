import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/ApplicationLayer/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/ApplicationLayer/decorators/active-user.interface';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { CreateFollowChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/create-followChannel.dto';
import { FollowedChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/followed-channel.dto';
import { UpdateFollowChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/update-followChannel.dto';
import { CreateFollowChannelService } from 'src/ApplicationLayer/UseCases/FollowChannelUseCases/create.followChannel';
import { FindFollowChannelService } from 'src/ApplicationLayer/UseCases/FollowChannelUseCases/find.followChannel';
import { UpdateFollowChannelService } from 'src/ApplicationLayer/UseCases/FollowChannelUseCases/update.followChannel';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';

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
  @Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: CreateFollowChannelDto,
  })    
  async createChannel(@ActiveUser() user: ActiveUserInterface, @Body() createFollowChannelDto: CreateFollowChannelDto): Promise<boolean> {
    return await this.createFollowChannelService.create(createFollowChannelDto, user.userID);
  }



  @Get('user')
  @Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all followed channels by a user' })
  async getFollowedChannelsByUser(@ActiveUser() user: ActiveUserInterface,): Promise<FollowedChannelDto[]> {
    return await this.getFollowChannelService.getByUserId(user.userID);
  }

}
