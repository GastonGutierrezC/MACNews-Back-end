import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UserService } from '../businessLayer/user.service'; // Referencia al servicio de la capa de negocio
import { CreateUserDto } from '../businessLayer/dto/create-user.dto';
import { UpdateUserDto } from '../businessLayer/dto/update-user.dto';
import { UpdateUserTypeDto } from '../businessLayer/dto/update-user-type.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findUser(id);
  }

  @Get(':UserEmail/:UserPassword')
  async findByEmailAndPassword(@Param('UserEmail') UserEmail: string,@Param('UserPassword') UserPassword: string) 
  {
    return await this.userService.findByEmailAndPassword(UserEmail, UserPassword);
  }
  

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id,updateUserDto);
  }


  @Patch(':UserID/type')
  async updateUserType(
    @Param('UserID') UserID: string,
    @Body() updateUserTypeDto: UpdateUserTypeDto
  ) {
    return await this.userService.updateUserType(UserID, updateUserTypeDto);
  }

}
