import { RolesEntity } from 'src/DomainLayer/Entities/roles.entity';
import { SearchHistoryEntity } from 'src/DomainLayer/Entities/SearchHistory.entity';
import { UserEntity } from 'src/DomainLayer/Entities/user.entity';

export interface IRolesRepository {
  findAll():Promise<RolesEntity[]>;
  findById(UserID: string): Promise<RolesEntity | null>;
  create(user: Partial<RolesEntity>): Promise<RolesEntity> ;
  update(id: string, updateData: Partial<RolesEntity>): Promise<RolesEntity>;

}
