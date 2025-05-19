import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { UpdateFollowChannelDto } from 'src/ApplicationLayer/dto/FollowChannelDTOs/update-followChannel.dto';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';
import { IFollowChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/followChannel.repository.interface';


@Injectable()
export class UpdateFollowChannelService {
  constructor(
    @Inject('IFollowChannelRepository')
    private readonly followChannelRepository: IFollowChannelRepository,
      
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
