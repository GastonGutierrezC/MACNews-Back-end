import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../DomainLayer/Entities/user.entity';

import { UserController } from '../InterfaceAdaptersLayer/Controllers/user.controller';
import { UserRepository } from '../InfrastructureLayer/Repositories/user.repository'; 
import { CreateUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/create.user';
import { FindUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/finds.user';
import { UpdateUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/updates.user';
import { PasswordEntity } from 'src/DomainLayer/Entities/pasword.entity';
import { PasswordRepository } from 'src/InfrastructureLayer/Repositories/password.repository';
import { RolesEntity } from 'src/DomainLayer/Entities/roles.entity';
import { RolesRepository } from 'src/InfrastructureLayer/Repositories/roles.repository';
import { UpdateUserRoleService } from 'src/ApplicationLayer/UseCases/UserUseCases/update-role.user';
import { UserRecommendationsEntity } from 'src/DomainLayer/Entities/userRecommendations.entity';
import { UserRecommendationsRepository } from 'src/InfrastructureLayer/Repositories/userRecommendations.repository';
import { CreateUserRecommendationService } from 'src/ApplicationLayer/UseCases/UserRecommendationsCases/create.recommendations';
import { FindUserRecommendationService } from 'src/ApplicationLayer/UseCases/UserRecommendationsCases/find.recommendations';
import { UpdateUserRecommendationService } from 'src/ApplicationLayer/UseCases/UserRecommendationsCases/update.recommendations';
import { UserRecommendationsController } from 'src/InterfaceAdaptersLayer/Controllers/UserRecommendations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRecommendationsEntity])],
  providers: [

    {
      provide: 'IUserRecommendationsRepository',
      useClass: UserRecommendationsRepository,
    },
    CreateUserRecommendationService,
    FindUserRecommendationService,
    UpdateUserRecommendationService,

    
    ], 
  controllers: [UserRecommendationsController],
  exports: [
    {
      provide: 'IUserRecommendationsRepository',
      useClass: UserRecommendationsRepository,
    },
    CreateUserRecommendationService,
    FindUserRecommendationService,
    UpdateUserRecommendationService,
  ],   
})
export class RecommendationModule {}
