import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationFormEntity } from '../DomainLayer/Entities/applicationForm.entity';
import { ApplicationFormController } from '../InterfaceAdaptersLayer/Controllers/applicationForm.controller';
import { UserModule } from './user.module';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { CreateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/create.applicationForm';
import { FindApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/find.applicationForm';
import { UpdateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/update.applicationForm';
import { JournalistApplicationsIntelligentAgent } from 'src/InfrastructureLayer/IntelligentAgentManagement/jurnalistApplications.IntelligentAgent';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationFormEntity]), 
    forwardRef(() => UserModule),
    
],
  controllers: [ApplicationFormController],
  providers: [
    {
      provide: 'IApplicationFormRepository',
      useClass: ApplicationFormRepository,
    }, 
    {
      provide: 'IJournalistApplicationsIntelligentAgent',
      useClass: JournalistApplicationsIntelligentAgent,
    },    
    CreateApplicationFormService,FindApplicationFormService,UpdateApplicationFormService],
  exports: [
    {
      provide: 'IApplicationFormRepository',
      useClass: ApplicationFormRepository,
    },  
    {
      provide: 'IJournalistApplicationsIntelligentAgent',
      useClass: JournalistApplicationsIntelligentAgent,
    },    
    CreateApplicationFormService,FindApplicationFormService,UpdateApplicationFormService
  ], 
})
export class ApplicationFormModule {}
