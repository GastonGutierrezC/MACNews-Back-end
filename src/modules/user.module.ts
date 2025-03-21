import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../dataLayer/entities/user.entity';

import { UserService } from '../businessLayer/servies/user.service';
import { UserController } from '../presentationLayer/user.controller';
import { UserRepository } from '../dataLayer/repositories/user.repository'; 

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository], 
  controllers: [UserController],
  exports: [UserService, UserRepository],   
})
export class UserModule {}
