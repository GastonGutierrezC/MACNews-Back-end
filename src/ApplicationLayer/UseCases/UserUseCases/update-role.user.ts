import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/UserDTOs/create-user.dto'; 
import { UserEntity } from '../../../DomainLayer/Entities/user.entity';
import { UserRepository } from '../../../InfrastructureLayer/Repositories/user.repository';
import { UpdateUserDto } from 'src/ApplicationLayer/dto/UserDTOs/update-user.dto';
import { PasswordRepository } from 'src/InfrastructureLayer/Repositories/password.repository';
import { RolesRepository } from 'src/InfrastructureLayer/Repositories/roles.repository';
import { CreateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto';
import { PasswordEntity } from 'src/DomainLayer/Entities/pasword.entity';
import { RolesEntity } from 'src/DomainLayer/Entities/roles.entity';
import { UpdateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/update-all-data-user.dto';
import { UpdateRolesDto } from 'src/ApplicationLayer/dto/RolesDTOs/update-roles.dto';

@Injectable()
export class UpdateUserRoleService {  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rolesRepository: RolesRepository, 
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
