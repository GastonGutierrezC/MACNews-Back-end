import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalistEntity } from '../DomainLayer/Entities/journalist.entity';
import { JournalistController } from '../InterfaceAdaptersLayer/Controllers/journalist.controller';
import { JournalistRepository } from '../InfrastructureLayer/Repositories/journalist.repository'; 
import { JournalistService } from 'src/ApplicationLayer/UseCases/journalist.service';
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
