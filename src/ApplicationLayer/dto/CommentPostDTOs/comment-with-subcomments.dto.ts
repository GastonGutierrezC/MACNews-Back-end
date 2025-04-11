
export class CommentWithSubcommentsDto {
    CommentPostID: string;
    TextComment: string;
    DateComment: Date;
    Subcomments?: CommentWithSubcommentsDto[];
  }
  