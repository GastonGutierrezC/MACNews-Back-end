import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';




import { UpdateUserRoleService } from 'src/ApplicationLayer/UseCases/UserUseCases/update-role.user';

import { ActiveUser } from 'src/ApplicationLayer/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/ApplicationLayer/decorators/active-user.interface';
import { Auth } from 'src/ApplicationLayer/decorators/auth.decorators';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';
import { FindUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/finds.user';
import { UpdateUserService } from 'src/ApplicationLayer/UseCases/UserUseCases/updates.user';
import { UpdateUserWithPasswordDto } from 'src/ApplicationLayer/dto/UserDTOs/update-all-data-user.dto';
import { UpdateRolesDto } from 'src/ApplicationLayer/dto/RolesDTOs/update-roles.dto';


@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly findUserService: FindUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserRoleService: UpdateUserRoleService,
  
  ) {}


  @Get("profile")
@Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get user profile (requires JWT)' })
  async profile(@ActiveUser() user: ActiveUserInterface, 
  
  ) {
    return await this.findUserService.findUser(user.userID);
  }

  @Patch()
  @ApiOperation({ summary: 'update user data' })
@Auth([RoleAssigned.Reader, RoleAssigned.Journalist])
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: UpdateUserWithPasswordDto, 
  })
  async update(@ActiveUser() user: ActiveUserInterface, @Body() updateUserDto: UpdateUserWithPasswordDto) {
    return await this.updateUserService.update(user.userID, updateUserDto);
  }

  @Patch('changeRole/:id')
  @ApiOperation({ summary: 'update user role data' })
  @Auth(RoleAssigned.Administrator)
  @ApiBearerAuth('access-token')


  @ApiBody({
    type: UpdateRolesDto,
  })
  async updateRole(@Param('id') id: string, @Body() updateUserDto: UpdateRolesDto) {
    return await this.updateUserRoleService.update(id, updateUserDto);
  }

}
