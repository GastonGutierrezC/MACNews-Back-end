import { Body, Controller, Get, Post, UseGuards, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { LocalAuthGuard } from "src/ApplicationLayer/Authentication_and_authorization/guard/local.guard";
import { ActiveUser } from "src/ApplicationLayer/decorators/active-user.decorator";
import { ActiveUserInterface } from "src/ApplicationLayer/decorators/active-user.interface";
import { Auth } from "src/ApplicationLayer/decorators/auth.decorators";
import { User } from "src/ApplicationLayer/decorators/req.user";
import { Roles } from "src/ApplicationLayer/decorators/roles.decorator";
import { CreateUserWithPasswordDto } from "src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto";
import { LoginUserDto } from "src/ApplicationLayer/dto/UserDTOs/login.dto";
import { ValidatedUserDto } from "src/ApplicationLayer/dto/UserDTOs/ValidatedUserDto";
import { AuthService } from "src/ApplicationLayer/UseCases/AuthUserCases/auth.useCases";

import { RoleAssigned } from "src/DomainLayer/Entities/roles.entity";
import { UserEntity } from "src/DomainLayer/Entities/user.entity";



@ApiTags('Auth')
@Controller("auth")
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    @Post("register")
    @ApiOperation({ summary: 'register a new user' })
    @ApiBody({ type: CreateUserWithPasswordDto })
    
    register(
        @Body()
        registerDTO: CreateUserWithPasswordDto,
    ){


        return this.authService.register(registerDTO);
    }
    
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user: ValidatedUserDto) {
    return this.authService.loginLocalUser(user);
  }


}

