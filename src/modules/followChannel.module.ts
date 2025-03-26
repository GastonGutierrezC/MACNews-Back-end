import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateFollowChannelService } from 'src/ApplicationLayer/UseCases/FollowChannelUseCases/create.followChannel';
import { FollowChannelEntity } from 'src/DomainLayer/Entities/followChannel.entity';
import { FollowChannelRepository } from 'src/InfrastructureLayer/Repositories/followChannel.repository';
import { FollowChannelController } from 'src/InterfaceAdaptersLayer/Controllers/followChannel.controller';
import { ChannelModule } from './channel.module';
import { UserModule } from './user.module';
import { UpdateFollowChannelService } from 'src/ApplicationLayer/UseCases/FollowChannelUseCases/update.followChannel';
import { FindFollowChannelService } from 'src/ApplicationLayer/UseCases/FollowChannelUseCases/find.followChannel';


@Module({
  imports: [
    TypeOrmModule.forFeature([FollowChannelEntity]),
    ChannelModule, 
    UserModule,
  ],
  controllers: [FollowChannelController],
  providers: [CreateFollowChannelService,FindFollowChannelService,UpdateFollowChannelService, FollowChannelRepository],
  exports: [CreateFollowChannelService,FindFollowChannelService,UpdateFollowChannelService, FollowChannelRepository],
})
export class FollowChannelModule {}
