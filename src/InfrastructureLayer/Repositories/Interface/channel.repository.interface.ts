import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';

export interface IChannelRepository{
  findAll():Promise<ChannelEntity[]>  ;
  findById(ChannelID: string): Promise<ChannelEntity | undefined> ;
  create(channel: Partial<ChannelEntity>): Promise<ChannelEntity> ;
  update(ChannelID: string, updateData: Partial<ChannelEntity>): Promise<void>;

}
