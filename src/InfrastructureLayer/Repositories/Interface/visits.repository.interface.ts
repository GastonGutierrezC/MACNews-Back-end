import { VisitsEntity } from "src/DomainLayer/Entities/visits.entity";

export interface IVisitRepository {
  findAll(): Promise<VisitsEntity[]>;
  findById(VisitsID: string): Promise<VisitsEntity | null>;
  create(visit: Partial<VisitsEntity>): Promise<VisitsEntity>;
  update(visitsID: string, updateData: Partial<VisitsEntity>): Promise<VisitsEntity>;

}
