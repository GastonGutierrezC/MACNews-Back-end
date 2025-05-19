import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';
import { IFollowChannelRepository } from './Interface/followChannel.repository.interface';

@Injectable()
export class FollowChannelRepository implements IFollowChannelRepository{
  constructor(
    @InjectRepository(FollowChannelEntity)
    private readonly followChannelRepo: Repository<FollowChannelEntity>,
  ) {}

  async findAll(): Promise<FollowChannelEntity[]> { 
    return await this.followChannelRepo.find({ relations: ['User', 'Channel'] });
  }     

  async findById(FollowChannelID: string): Promise<FollowChannelEntity | undefined> {
    return await this.followChannelRepo.findOne({ where: { FollowChannelID } });
  }

  async create(followChannel: Partial<FollowChannelEntity>): Promise<FollowChannelEntity> {
    const newFollowChannel = this.followChannelRepo.create(followChannel);
    return await this.followChannelRepo.save(newFollowChannel);
  }

  async update(FollowChannelID: string, updateData: Partial<FollowChannelEntity>): Promise<void> {
    await this.followChannelRepo.update(FollowChannelID, updateData);
  }
}
