import { PasswordEntity } from 'src/DomainLayer/Entities/pasword.entity';

export interface IPasswordRepository {
  findAll():Promise<PasswordEntity[]>;
  findById(PasswordID: string): Promise<PasswordEntity | null>;
  create(user: Partial<PasswordEntity>): Promise<PasswordEntity>  ;
  update(id: string, updateData: Partial<PasswordEntity>): Promise<PasswordEntity>;

}
