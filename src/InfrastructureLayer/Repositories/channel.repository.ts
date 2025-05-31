import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelEntity } from '../../DomainLayer/Entities/channel.entity';
import { IChannelRepository } from './Interface/channel.repository.interface';

@Injectable()
export class ChannelRepository implements IChannelRepository {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channelRepo: Repository<ChannelEntity>,
  ) {}

  async findAll(): Promise<ChannelEntity[]> { 
    return await this.channelRepo.find({
      relations: ['Journalist', 'Journalist.User'],
    });
  }       

  async findById(ChannelID: string): Promise<ChannelEntity | undefined> {
    return await this.channelRepo.findOne({ where: { ChannelID },relations: ['Journalist', 'Journalist.User'], });
  }
  

  async create(channel: Partial<ChannelEntity>): Promise<ChannelEntity> {
    const newChannel = this.channelRepo.create(channel);
    return await this.channelRepo.save(newChannel);
  }

  async update(ChannelID: string, updateData: Partial<ChannelEntity>): Promise<void> {
    await this.channelRepo.update(ChannelID, updateData);
  }

}
