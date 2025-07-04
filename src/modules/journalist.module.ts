import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { CreateJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/create.journalist';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';
import { JournalistController } from 'src/InterfaceAdaptersLayer/Controllers/journalist.controller';
import { ApplicationFormModule } from './applicationForm.module';
import { UpdateJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/update.journalist';
import { FindJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/find.journalist';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JournalistEntity]), 
    ApplicationFormModule,
    
  forwardRef(() => AuthModule),
    
    forwardRef(() => UserModule),
],
  controllers: [JournalistController],
  providers: [
    {
      provide: 'IJournalistRepository',
      useClass: JournalistRepository,
    },
    
    CreateJournalistService,UpdateJournalistService,FindJournalistService],
  exports: [
    {
      provide: 'IJournalistRepository',
      useClass: JournalistRepository,
    },
    
    CreateJournalistService,UpdateJournalistService,FindJournalistService
  ], 
})
export class JournalistModule {}
