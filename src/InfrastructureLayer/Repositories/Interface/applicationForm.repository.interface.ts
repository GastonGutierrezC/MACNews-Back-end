import { ApplicationFormEntity } from 'src/DomainLayer/Entities/applicationForm.entity';

export interface IApplicationFormRepository{
  findAll():Promise<ApplicationFormEntity[]> ;
  findById(ApplicationFormID: string): Promise<ApplicationFormEntity | null> ;
  create(applicationForm: Partial<ApplicationFormEntity>): Promise<ApplicationFormEntity>;
  update(applicationFormID: string, updateData: Partial<ApplicationFormEntity>): Promise<ApplicationFormEntity>;

}
