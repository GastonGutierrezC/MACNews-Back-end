import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';

export interface IFollowChannelRepository{
  findAll(): Promise<FollowChannelEntity[]> ;
  findById(FollowChannelID: string): Promise<FollowChannelEntity | undefined> ;
  create(followChannel: Partial<FollowChannelEntity>): Promise<FollowChannelEntity>  ;
  update(FollowChannelID: string, updateData: Partial<FollowChannelEntity>): Promise<void>;

}
