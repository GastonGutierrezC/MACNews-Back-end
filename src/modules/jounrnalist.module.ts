import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalistEntity } from '../dataLayer/entities/journalist.entity';
import { JournalistController } from '../presentationLayer/journalist.controller';
import { JournalistRepository } from '../dataLayer/repositories/journalist.repository'; 
import { JournalistService } from 'src/businessLayer/servies/journalist.service';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JournalistEntity]), 
    UserModule,  
],
  controllers: [JournalistController],
  providers: [JournalistService, JournalistRepository],
  exports: [JournalistService,JournalistRepository
  ], 
})
export class JournalistModule {}
