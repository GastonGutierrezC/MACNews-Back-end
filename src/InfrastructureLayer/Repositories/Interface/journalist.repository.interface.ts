import { JournalistEntity } from 'src/DomainLayer/Entities/journalist.entity';

export interface IJournalistRepository{
  findAll(): Promise<JournalistEntity[]> ;
  findById(JournalistID: string): Promise<JournalistEntity | null> ;
  create(user: Partial<JournalistEntity>): Promise<JournalistEntity>   ;
  update(id: string, updateData: Partial<JournalistEntity>): Promise<JournalistEntity>;

}
