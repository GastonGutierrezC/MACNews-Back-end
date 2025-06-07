import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationFormEntity } from '../DomainLayer/Entities/applicationForm.entity';
import { ApplicationFormController } from '../InterfaceAdaptersLayer/Controllers/applicationForm.controller';
import { UserModule } from './user.module';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { CreateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/create.applicationForm';
import { FindApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/find.applicationForm';
import { UpdateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/update.applicationForm';
import { CreateJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/create.journalist';
import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';
import { JournalistRepository } from 'src/InfrastructureLayer/Repositories/journalist.repository';
import { JournalistController } from 'src/InterfaceAdaptersLayer/Controllers/journalist.controller';
import { ApplicationFormModule } from './applicationForm.module';
import { UpdateJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/update.journalist';
import { FindJournalistService } from 'src/ApplicationLayer/UseCases/JournalistUseCases/find.journalist';

@Module({
  imports: [
    TypeOrmModule.forFeature([JournalistEntity]), 
    ApplicationFormModule,  
    
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
