import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../../DomainLayer/Entities/user.entity';
import { UserRepository } from '../../../InfrastructureLayer/Repositories/user.repository';

@Injectable()
export class FindUserService {  
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findUser(UserID: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(UserID);
    if (!user) {
      throw new NotFoundException(`User with ID ${UserID} not found.`);
    }
    return user;
  }


}
