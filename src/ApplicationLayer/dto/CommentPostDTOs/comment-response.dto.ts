// src/ApplicationLayer/dto/CommentPostDTOs/comment-response.dto.ts

export class SubcommentDto {
  CommentPostID: string;
  TextComment: string;
  DateComment: string; // ISO 8601 string
  UserFullName: string;
  UserImageURL: string;
}

export class CommentDto {
  CommentPostID: string;
  TextComment: string;
  DateComment: string; // ISO 8601 string
  UserFullName: string;
  UserImageURL: string;
  Subcomments: SubcommentDto[]; // Inicialmente vacío para un comentario nuevo
}
