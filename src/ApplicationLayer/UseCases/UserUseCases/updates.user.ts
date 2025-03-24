import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../dto/UserDTOs/create-user.dto'; 
import { UserEntity } from '../../../DomainLayer/Entities/user.entity';
import { UserRepository } from '../../../InfrastructureLayer/Repositories/user.repository';
import { UpdateUserDto } from 'src/ApplicationLayer/dto/UserDTOs/update-user.dto';

@Injectable()
export class UpdateUserService {  
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    await this.userRepository.update(id, updateUserDto);

    return this.userRepository.findById(id); 
  }



  
}
