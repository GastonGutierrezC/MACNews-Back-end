// src/ApplicationLayer/dto/CommentPostDTOs/comments-by-channel-response.dto.ts

import { CommentWithUserDTO } from './comment-with-user.dto';

export class CommentsByChannelResponseDto {
  ChannelID: string;
  Comments: CommentWithUserDTO[];

}
