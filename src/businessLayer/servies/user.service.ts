import { Injectable,BadRequestException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../dataLayer/entities/user.entity';
import { CreateUserDto } from '../dto/User/create-user.dto'; 
import { UpdateUserDto } from '../dto/User/update-user.dto';
import { UpdateUserTypeDto } from '../dto/User/update-user-type.dto';
import { UserRepository } from '../../dataLayer/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>, 
    private userRepository: UserRepository, 
  ) {}



  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { UserEmail, UserPassword } = createUserDto;


    const existingUser = await this.repository.findOne({ where: { UserEmail } });
    if (existingUser) {
      throw new BadRequestException('Email is already in use.');
    }


    const existingPassword = await this.repository.findOne({ where: { UserPassword } });
    if (existingPassword) {
      throw new BadRequestException('Password must be unique.');
    }

    const newUser = this.userRepository.create(createUserDto);
    return newUser;
  }


  async findUser(UserID: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(UserID);
    if (!user) {
      throw new NotFoundException(`User with ID ${UserID} not found.`);
    }
    return user;
  }

  async findByEmailAndPassword(UserEmail: string, UserPassword: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmailAndPassword(UserEmail, UserPassword);
    if (!user) {
      throw new NotFoundException(`No user found with the provided email and password.`);
    }
    return user;
  }
  

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {

    await this.userRepository.update(id, updateUserDto);
    return this.findUser(id); 
  }

  async updateUserType(UserID: string, updateUserTypeDto: UpdateUserTypeDto): Promise<UserEntity> {
    const user = await this.findUser(UserID); 
  
    user.UserType = updateUserTypeDto.UserType;
    return await this.repository.save(user);
  }
  

}
