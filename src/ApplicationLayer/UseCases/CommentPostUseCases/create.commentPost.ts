import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateCommentPostDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/create-commentPost.dto';
import { CommentDto, SubcommentDto } from 'src/ApplicationLayer/dto/CommentPostDTOs/comment-response.dto';
import { IInterestAnalysisAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/Interfaces/CommentPostMetrics.intelligentAgent.interface';
import { IChannelRepository } from 'src/InfrastructureLayer/Repositories/Interface/channel.repository.interface';
import { ICommentPostRepository } from 'src/InfrastructureLayer/Repositories/Interface/commentPost.repository.interface';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';

@Injectable()
export class CreateCommentPostService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICommentPostRepository')
    private readonly commentPostRepository: ICommentPostRepository,
    @Inject('IChannelRepository')
    private readonly channelRepository: IChannelRepository, 
    @Inject('IInterestAnalysisAgent')
    private readonly interestAnalysisAgent: IInterestAnalysisAgent,
  ) {}

  async create(createCommentPostDto: CreateCommentPostDto): Promise<CommentDto> {
    const user = await this.userRepository.findById(createCommentPostDto.UserID);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const channel = await this.channelRepository.findById(createCommentPostDto.ChannelID);
    if (!channel) {
      throw new NotFoundException('Channel not found.');
    }

    let parentComment = null;
    if (createCommentPostDto.ParentComment) {
      parentComment = await this.commentPostRepository.findById(createCommentPostDto.ParentComment);
      if (!parentComment) {
        throw new NotFoundException('Parent comment not found.');
      }
    }

    // Crear el comentario en BD
    const newComment = await this.commentPostRepository.create({
      User: user,
      Channel: channel,
      ParentComment: parentComment,
      TextComment: createCommentPostDto.TextComment,
    });

    // Ejecutar agente ASÍNCRONAMENTE, sin esperar resultado
    this.interestAnalysisAgent.analyzeChannelInterests(channel.ChannelID)
      .then(() => {
        console.log('Interest analysis agent executed successfully.');
      })
      .catch(err => {
        console.error('Error executing interest analysis agent:', err);
      });

    // Construir la respuesta con los datos solicitados
    const response: CommentDto = {
      CommentPostID: newComment.CommentPostID,
      TextComment: newComment.TextComment,
      DateComment: newComment.DateComment.toISOString(),
      UserFullName: `${user.UserFirstName} ${user.UserLastName}`, // Asumiendo que user tiene FirstName y LastName
      UserImageURL: user.UserImageURL,
      Subcomments: [], // Vacío porque es un comentario nuevo
    };

    return response;
  }
}
