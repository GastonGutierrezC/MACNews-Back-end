import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationFormEntity } from '../DomainLayer/Entities/applicationForm.entity';
import { ApplicationFormController } from '../InterfaceAdaptersLayer/Controllers/applicationForm.controller';
import { UserModule } from './user.module';
import { ApplicationFormRepository } from 'src/InfrastructureLayer/Repositories/applicationForm.repository';
import { CreateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/create.applicationForm';
import { FindApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/find.applicationForm';
import { UpdateApplicationFormService } from 'src/ApplicationLayer/UseCases/ApplicationFormUseCases/update.applicationForm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationFormEntity]), 
    UserModule,  
    
],
  controllers: [ApplicationFormController],
  providers: [CreateApplicationFormService,FindApplicationFormService,UpdateApplicationFormService, ApplicationFormRepository],
  exports: [CreateApplicationFormService,FindApplicationFormService,UpdateApplicationFormService,ApplicationFormRepository
  ], 
})
export class ApplicationFormModule {}
