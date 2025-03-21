import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelEntity } from '../entities/channel.entity';

@Injectable()
export class ChannelRepository {
  constructor(
    @InjectRepository(ChannelEntity)
    private readonly channelRepo: Repository<ChannelEntity>,
  ) {}

  async findById(ChannelID: string): Promise<ChannelEntity | null> {
    return await this.channelRepo.findOne({
      where: { ChannelID },
      relations: ['Journalist', 'Journalist.User'], // Cargamos las relaciones necesarias
    });
  }

  async create(channel: Partial<ChannelEntity>): Promise<ChannelEntity> {
    const newChannel = this.channelRepo.create(channel);
    return await this.channelRepo.save(newChannel);
  }

  async update(ChannelID: string, updateData: Partial<ChannelEntity>): Promise<void> {
    await this.channelRepo.update(ChannelID, updateData);
  }

  async findByJournalistId(JournalistID: string): Promise<ChannelEntity | null> {
    return await this.channelRepo.findOneBy({ Journalist: { JournalistID } });
  }
}
