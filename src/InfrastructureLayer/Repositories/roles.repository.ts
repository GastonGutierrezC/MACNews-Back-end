import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from 'src/DomainLayer/Entities/roles.entity';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepo: Repository<RolesEntity>,
  ) {}

  async findAll(): Promise<RolesEntity[]> { 
    return await this.rolesRepo.find();
  }

  async findById(UserID: string): Promise<RolesEntity | null> {
    return await this.rolesRepo.findOne({ where: { UserID } });
  }

  async create(user: Partial<RolesEntity>): Promise<RolesEntity> {
    const newUser = this.rolesRepo.create(user);
    return await this.rolesRepo.save(newUser);
  }

  async update(id: string, updateData: Partial<RolesEntity>): Promise<RolesEntity> {
    await this.rolesRepo.update(id, updateData);
    return await this.findById(id); 
  }
  
  
}
