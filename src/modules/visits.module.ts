import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitsEntity } from 'src/DomainLayer/Entities/visits.entity';
import { VisitsRepository } from 'src/InfrastructureLayer/Repositories/visits.repository';
import { VisitsController } from 'src/InterfaceAdaptersLayer/Controllers/visits.controller';
import { CreateVisitsService } from 'src/ApplicationLayer/UseCases/VisitsUseCases/create.visits';
import { UserModule } from './user.module';
import { NewsModule } from './news.module';
import { FindVisitsService } from 'src/ApplicationLayer/UseCases/VisitsUseCases/find.visits';

@Module({
  imports: [
    TypeOrmModule.forFeature([VisitsEntity]),
    UserModule,
    
    forwardRef(() => NewsModule),

  ],
  controllers: [VisitsController],
  providers: [
    {
      provide: 'IVisitRepository',
      useClass: VisitsRepository,
    },
    CreateVisitsService,FindVisitsService],
  exports: [
    {
      provide: 'IVisitRepository',
      useClass: VisitsRepository,
    },
    
    CreateVisitsService,FindVisitsService],
})
export class VisitsModule {}
