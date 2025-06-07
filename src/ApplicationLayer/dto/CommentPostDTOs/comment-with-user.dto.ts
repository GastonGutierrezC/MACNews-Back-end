// src/ApplicationLayer/DTOs/comment-with-user.dto.ts
export class CommentWithUserDTO {
  CommentPostID: string;
  TextComment: string;
  DateComment: Date;
  UserFullName: string;
  UserImageURL: string;
  Subcomments?: CommentWithUserDTO[];
}
