import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/ApplicationLayer/dto/UserDTOs/create-user.dto';
import { CreatePasswordDto } from 'src/ApplicationLayer/dto/PasswordDTOs/create-password.dto';
import { CreateUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/create.user';
import { FindUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/finds.user';
import { UpdateUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/updates.user';
import { UpdateUserDto } from 'src/ApplicationLayer/dto/UserDTOs/update-user.dto';
import { CreateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto';
import { UpdateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/update-all-data-user.dto';
import { UpdateRolesDto } from 'src/ApplicationLayer/dto/RolesDTOs/update-roles.dto';
import { UpdateUserRoleService } from 'src/ApplicationLayer/UseCases/UserUseCases/update-role.user';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly findUserService: FindUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserRoleService: UpdateUserRoleService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserWithPasswordDto, 
  })
  async create(@Body() createUserWithPasswordDto: CreateUserWithPasswordDto) {
    return await this.createUser.create(createUserWithPasswordDto);
  }

  @Get('findByCredentials')  
  @ApiOperation({ summary: 'Get user by Email and Password' })
  async findByCredentials(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    return await this.findUserService.findUserByEmailAndPassword(email, password);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async findOne(@Param('id') id: string) {
    return await this.findUserService.findUser(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update user data' })
  @ApiBody({
    type: UpdateUserWithPasswordDto, 
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserWithPasswordDto) {
    return await this.updateUserService.update(id, updateUserDto);
  }

  @Patch('changeRole/:id')
  @ApiOperation({ summary: 'update user role data' })
  @ApiBody({
    type: UpdateRolesDto,
  })
  async updateRole(@Param('id') id: string, @Body() updateUserDto: UpdateRolesDto) {
    return await this.updateUserRoleService.update(id, updateUserDto);
  }
}
