import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateFollowChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/update-followChannel.dto';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';
import { FollowChannelRepository } from 'src/InfrastructureLayer/Repositories/followChannel.repository';


@Injectable()
export class UpdateFollowChannelService {
  constructor(
    private readonly followChannelRepository: FollowChannelRepository,
  ) {}

  async update(FollowChannelID: string, updateFollowChannelDto: UpdateFollowChannelDto): Promise<FollowChannelEntity> {
    const followChannel = await this.followChannelRepository.findById(FollowChannelID);
    
    if (!followChannel) {
      throw new NotFoundException(`FollowChannel with ID ${FollowChannelID} not found.`);
    }

    await this.followChannelRepository.update(FollowChannelID, {
      IsFollow: updateFollowChannelDto.IsFollow,
    });


    return this.followChannelRepository.findById(FollowChannelID);
  }
}
