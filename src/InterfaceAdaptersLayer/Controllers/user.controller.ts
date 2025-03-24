import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/ApplicationLayer/dto/UserDTOs/create-user.dto';
import { CreatePasswordDto } from 'src/ApplicationLayer/dto/PasswordDTOs/create-password.dto';
import { CreateUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/create.user';
import { FindUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/finds.user';
import { UpdateUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/updates.user';
import { UpdateUserDto } from 'src/ApplicationLayer/dto/UserDTOs/update-user.dto';
import { CreateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly findUserService: FindUserService,
    private readonly updateUserService: UpdateUserService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({
    type: CreateUserWithPasswordDto, // Usar el DTO combinado aquí
  })
  async create(@Body() createUserWithPasswordDto: CreateUserWithPasswordDto) {
    return await this.createUser.create(createUserWithPasswordDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.findUserService.findUser(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.updateUserService.update(id, updateUserDto);
  }
}
