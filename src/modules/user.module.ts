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

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,PasswordEntity])],
  providers: [
     UserRepository,
     PasswordRepository,
     CreateUserService,
     FindUserService,
     UpdateUserService
    ], 
  controllers: [UserController],
  exports: [
    UserRepository,
    PasswordRepository,
    CreateUserService,
    FindUserService,
    UpdateUserService
  ],   
})
export class UserModule {}
