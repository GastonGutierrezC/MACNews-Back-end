import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { UpdateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/update-all-data-user.dto';
import { IUserRepository } from 'src/InfrastructureLayer/Repositories/Interface/user.repository.interface';
import { IPasswordRepository } from 'src/InfrastructureLayer/Repositories/Interface/password.repository.interface';

@Injectable()
export class UpdateUserService {  
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordRepository')
    private readonly passwordRepository: IPasswordRepository, 

  ) {}

  async update(id: string, updateUserWithPasswordDto: UpdateUserWithPasswordDto) {
    const { password, user } = updateUserWithPasswordDto;
  
    const allUsers = await this.userRepository.findAll();
    const existingUser = allUsers.find(u => u.UserID === id);
  
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  
    const updatedUser = await this.userRepository.update(id, user);
  
    const allPasswords = await this.passwordRepository.findAll();
    const existingPassword = allPasswords.find(p => p.UserID === id);
  
    let updatedPassword = null;
    if (existingPassword) {
      await this.passwordRepository.update(existingPassword.PasswordID, password);
      updatedPassword = await this.passwordRepository.findById(existingPassword.PasswordID);
    }
  
    return { user: updatedUser, password: updatedPassword };
  }
  
  
  


  
}
