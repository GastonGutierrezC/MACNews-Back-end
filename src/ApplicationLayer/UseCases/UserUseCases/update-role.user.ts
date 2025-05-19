import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RolesRepository } from 'src/InfrastructureLayer/Repositories/roles.repository';
import { UpdateRolesDto } from 'src/ApplicationLayer/dto/RolesDTOs/update-roles.dto';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { IRolesRepository } from 'src/InfrastructureLayer/Repositories/Interface/roles.repository.interface';

@Injectable()
export class UpdateUserRoleService {  
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IRolesRepository')
    private readonly rolesRepository: IRolesRepository,
) {}

async update(id: string, updateRolesDto: UpdateRolesDto) {
    const { roleAssigned } = updateRolesDto;
  
    const existingUser = await this.userRepository.findById(id);
    
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  
    const allRoles = await this.rolesRepository.findAll();
    const existingRole = allRoles.find(role => role.UserID === id);
    
    if (!existingRole) {
      throw new NotFoundException(`Role for User with ID ${id} not found.`);
    }
  
    existingRole.RoleAssigned = roleAssigned; 
  
    const updatedRole = await this.rolesRepository.update(existingRole.RolID, existingRole);
  
    const roleAfterUpdate = await this.rolesRepository.findById(existingRole.UserID); 
  
    console.log('Updated Role:', roleAfterUpdate); 
  
    return { user: existingUser, role: roleAfterUpdate }; 
  }
  
  
}


