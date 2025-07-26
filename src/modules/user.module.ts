import { forwardRef, Module } from '@nestjs/common';
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
import { JournalistModule } from './journalist.module';
import { AuthModule } from './auth.module';
import { CryptoService } from 'src/ApplicationLayer/Authentication_and_authorization/crypto.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,PasswordEntity,RolesEntity]),
  RecommendationModule,
  forwardRef(() => JournalistModule),
],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IRolesRepository',
      useClass: RolesRepository,
    },
    {
      provide: 'IPasswordRepository',
      useClass: PasswordRepository,
    },
     CreateUserService,
     FindUserService,
     UpdateUserService,
     UpdateUserRoleService,
     CryptoService
    ], 
  controllers: [UserController],
  exports: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IRolesRepository',
      useClass: RolesRepository,
    },
    {
      provide: 'IPasswordRepository',
      useClass: PasswordRepository,
    },
    CreateUserService,
    FindUserService,
    UpdateUserService,
    UpdateUserRoleService,
    CryptoService
  ],   
})
export class UserModule {}
