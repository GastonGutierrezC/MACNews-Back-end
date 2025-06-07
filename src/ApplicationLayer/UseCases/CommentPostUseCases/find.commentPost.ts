import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentWithUserDTO } from 'src/ApplicationLayer/dto/CommentPostDTOs/comment-with-user.dto';
import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';
import { ICommentPostRepository } from 'src/InfrastructureLayer/Repositories/Interface/commentPost.repository.interface';


@Injectable()
export class FindCommentPostService {
  constructor(
    @Inject('ICommentPostRepository')
    private readonly commentPostRepository: ICommentPostRepository,
  
  ) {}

  async findById(CommentPostID: string): Promise<CommentPostEntity> {
    const commentPost = await this.commentPostRepository.findById(CommentPostID);
    if (!commentPost) {
      throw new NotFoundException(`CommentPost with ID ${CommentPostID} not found.`);
    }
    return commentPost;
  }


  async findByIdChannel(
  ChannelID: string,
  page: number = 1,
  limit: number = 10,
): Promise<{
  ChannelID: string;
  Comments: CommentWithUserDTO[];
}> {
  const allComments = await this.commentPostRepository.findAll();

  const channelComments = allComments.filter(
    (comment) => comment.Channel?.ChannelID === ChannelID,
  );

  const rootComments = channelComments.filter(c => !c.ParentComment);
  const subComments = channelComments.filter(c => !!c.ParentComment);

  // Ordenar por fecha descendente (más recientes primero)
  rootComments.sort((a, b) => new Date(b.DateComment).getTime() - new Date(a.DateComment).getTime());

  // Paginación
  const total = rootComments.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedRootComments = rootComments.slice(startIndex, endIndex);

  // Agrupar subcomentarios
  const subMap = subComments.reduce((acc, comment) => {
    const parentId = comment.ParentComment.CommentPostID;
    if (!acc[parentId]) acc[parentId] = [];
    acc[parentId].push({
      CommentPostID: comment.CommentPostID,
      TextComment: comment.TextComment,
      DateComment: comment.DateComment,
      UserFullName: `${comment.User.UserFirstName} ${comment.User.UserLastName}`,
      UserImageURL: comment.User.UserImageURL,
    });
    return acc;
  }, {} as Record<string, CommentWithUserDTO[]>);

  Object.keys(subMap).forEach(parentId => {
    subMap[parentId].sort((a, b) => new Date(b.DateComment).getTime() - new Date(a.DateComment).getTime());
  });

  const commentsWithSub: CommentWithUserDTO[] = paginatedRootComments.map((comment) => {
    const baseComment: CommentWithUserDTO = {
      CommentPostID: comment.CommentPostID,
      TextComment: comment.TextComment,
      DateComment: comment.DateComment,
      UserFullName: `${comment.User.UserFirstName} ${comment.User.UserLastName}`,
      UserImageURL: comment.User.UserImageURL,
    };

    const subcomments = subMap[comment.CommentPostID];
    if (subcomments && subcomments.length > 0) {
      return {
        ...baseComment,
        Subcomments: subcomments,
      };
    }

    return baseComment;
  });

  return {
    ChannelID,
    Comments: commentsWithSub,

  };
}


async findAllByIdChannel(ChannelID: string): Promise<{ ChannelID: string; Comments: CommentWithUserDTO[] }> {
  const allComments = await this.commentPostRepository.findAll();

  const channelComments = allComments.filter(
    (comment) => comment.Channel?.ChannelID === ChannelID,
  );

  const rootComments = channelComments.filter(c => !c.ParentComment);
  const subComments = channelComments.filter(c => !!c.ParentComment);

  rootComments.sort((a, b) => new Date(b.DateComment).getTime() - new Date(a.DateComment).getTime());

  const subMap = subComments.reduce((acc, comment) => {
    const parentId = comment.ParentComment.CommentPostID;
    if (!acc[parentId]) acc[parentId] = [];
    acc[parentId].push({
      CommentPostID: comment.CommentPostID,
      TextComment: comment.TextComment,
      DateComment: comment.DateComment,
      UserFullName: `${comment.User.UserFirstName} ${comment.User.UserLastName}`,
      UserImageURL: comment.User.UserImageURL,
    });
    return acc;
  }, {} as Record<string, CommentWithUserDTO[]>);

  Object.keys(subMap).forEach(parentId => {
    subMap[parentId].sort((a, b) => new Date(b.DateComment).getTime() - new Date(a.DateComment).getTime());
  });

  const commentsWithSub: CommentWithUserDTO[] = rootComments.map((comment) => {
    const baseComment: CommentWithUserDTO = {
      CommentPostID: comment.CommentPostID,
      TextComment: comment.TextComment,
      DateComment: comment.DateComment,
      UserFullName: `${comment.User.UserFirstName} ${comment.User.UserLastName}`,
      UserImageURL: comment.User.UserImageURL,
    };

    const subcomments = subMap[comment.CommentPostID];
    if (subcomments && subcomments.length > 0) {
      return {
        ...baseComment,
        Subcomments: subcomments,
      };
    }

    return baseComment;
  });

  return {
    ChannelID,
    Comments: commentsWithSub,
  };
}

  
  
}
