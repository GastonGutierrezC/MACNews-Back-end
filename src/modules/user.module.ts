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
import { RecommendationModule } from './recommendation.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,PasswordEntity,RolesEntity]),
  RecommendationModule],
  providers: [
     UserRepository,
     PasswordRepository,
     RolesRepository,
     CreateUserService,
     FindUserService,
     UpdateUserService,
     UpdateUserRoleService
    ], 
  controllers: [UserController],
  exports: [
    UserRepository,
    PasswordRepository,
    RolesRepository,
    CreateUserService,
    FindUserService,
    UpdateUserService,
    UpdateUserRoleService
  ],   
})
export class UserModule {}
