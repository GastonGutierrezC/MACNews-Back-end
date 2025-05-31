// src/ApplicationLayer/DTOs/channel-with-creator-name.dto.ts
import { ChannelEntity } from 'src/DomainLayer/Entities/channel.entity';

export class ChannelWithCreatorNameDto {
  channel: ChannelEntity;
  creatorFullName: string;
}
