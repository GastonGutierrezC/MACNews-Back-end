import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserService } from "../UserUseCases/create.user";
import { FindUserService } from "../UserUseCases/finds.user";
import { CreateUserWithPasswordDto } from "src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto";
import * as bcryptjs from "bcryptjs"
import { LoginUserDto } from "src/ApplicationLayer/dto/UserDTOs/login.dto";
import { JwtService } from "@nestjs/jwt";
import e from "express";
import { IUserRepository } from "src/InfrastructureLayer/Repositories/Interface/user.repository.interface";
import { IPasswordRepository } from "src/InfrastructureLayer/Repositories/Interface/password.repository.interface";
import { CreateJournalistDto } from "src/ApplicationLayer/dto/JournalistDTOs/create-journalist.dto";
import { CreateJournalistService } from "../JournalistUseCases/create.journalist";


@Injectable()
export class AuthService {

    constructor(
    @Inject('IPasswordRepository')
    private readonly passwordRepository: IPasswordRepository,
        private readonly createUserService: CreateUserService,
        private readonly findUserService: FindUserService,
        private readonly jwtService: JwtService,
        private readonly createJournalistService: CreateJournalistService,
    ){}

async register(registerDTO: CreateUserWithPasswordDto) {
  // Crear el usuario
  const user = await this.createUserService.create(registerDTO);

  // Generar payload para el token
  const payload = {
    email: user.UserEmail,
    role: user.RoleAssigned,
    userID: user.UserID
  };

  // Crear el token JWT
  const token = await this.jwtService.signAsync(payload);

  // Retornar el token
  return { token };
}


async login(loginDTO: LoginUserDto) {
  const user = await this.findUserService.findUserByEmail(loginDTO.UserEmail);

  const allPasswords = await this.passwordRepository.findAll();
  const userPassword = allPasswords.find(p => p.UserID === user.UserID);

  const isPasswordValid = await bcryptjs.compare(
    loginDTO.PasswordUser,
    userPassword.PasswordUser
  );

  if (!isPasswordValid) {
    throw new UnauthorizedException('Incorrect password.');
  }

  // Construimos el payload base
  const payload: any = {
    email: user.UserEmail,
    role: user.RoleAssigned,
    userID: user.UserID,
  };

  // Si tiene un JournalistID, lo añadimos al token
  if (user.JournalistID) {
    payload.journalistID = user.JournalistID;
  }

  const token = await this.jwtService.signAsync(payload);

  return { token };
}


async promoteToJournalist(dto: CreateJournalistDto, userID: string) {
  const journalist = await this.createJournalistService.create(dto, userID);

  const payload = {
    email: journalist.userEmail,
    role: journalist.role,
    userID: journalist.userID,
    journalistID: journalist.journalistID,
  };

  const token = await this.jwtService.signAsync(payload);

  return { token };
}



}