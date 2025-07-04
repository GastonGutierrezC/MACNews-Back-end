import { Body, Controller, Get, Post, UseGuards, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { ActiveUser } from "src/ApplicationLayer/decorators/active-user.decorator";
import { ActiveUserInterface } from "src/ApplicationLayer/decorators/active-user.interface";
import { Auth } from "src/ApplicationLayer/decorators/auth.decorators";
import { Roles } from "src/ApplicationLayer/decorators/roles.decorator";
import { CreateUserWithPasswordDto } from "src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto";
import { LoginUserDto } from "src/ApplicationLayer/dto/UserDTOs/login.dto";
import { AuthService } from "src/ApplicationLayer/UseCases/AuthUserCases/auth.useCases";
import { AuthGuard } from "src/ApplicationLayer/UseCases/AuthUserCases/guard/auth.guard";
import { RolesGuard } from "src/ApplicationLayer/UseCases/AuthUserCases/guard/role.guard";
import { RoleAssigned } from "src/DomainLayer/Entities/roles.entity";

interface RequestWithUser extends Request {
  user: { email: string; role: string };
}

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

    @Post("login")
    @ApiOperation({ summary: 'log inuser' })
    @ApiBody({ type: LoginUserDto })
    login(

        @Body()
        loginDTO: LoginUserDto,
    ){
      return this.authService.login(loginDTO);
    }


}

