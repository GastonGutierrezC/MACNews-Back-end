import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { CreateCommentPostService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/create.commentPost';
import { CommentPostEntity } from 'src/DomainLayer/Entities/commentPost.entity';
import { CommentPostRepository } from 'src/InfrastructureLayer/Repositories/commentPost.repository';
import { CommentPostController } from 'src/InterfaceAdaptersLayer/Controllers/commentPost.controller';
import { ChannelModule } from './channel.module';
import { FindCommentPostService } from 'src/ApplicationLayer/UseCases/CommentPostUseCases/find.commentPost';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentPostEntity]), 
    UserModule,  
    ChannelModule,
    
],
  controllers: [CommentPostController],
  providers: [CreateCommentPostService,FindCommentPostService, CommentPostRepository],
  exports: [CreateCommentPostService,FindCommentPostService,CommentPostRepository
  ], 
})
export class CommentPostModule {}
