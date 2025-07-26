import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserService } from "../UserUseCases/create.user";
import { FindUserService } from "../UserUseCases/finds.user";
import { CreateUserWithPasswordDto } from "src/ApplicationLayer/dto/UserDTOs/create-all-data-user.dto";
import { LoginUserDto } from "src/ApplicationLayer/dto/UserDTOs/login.dto";
import { JwtService } from "@nestjs/jwt";
import e from "express";
import { IUserRepository } from "src/InfrastructureLayer/Repositories/Interface/user.repository.interface";
import { IPasswordRepository } from "src/InfrastructureLayer/Repositories/Interface/password.repository.interface";
import { CreateJournalistDto } from "src/ApplicationLayer/dto/JournalistDTOs/create-journalist.dto";
import { CreateJournalistService } from "../JournalistUseCases/create.journalist";
import { ValidatedUserDto } from "src/ApplicationLayer/dto/UserDTOs/ValidatedUserDto";
import { CryptoService } from "src/ApplicationLayer/Authentication_and_authorization/crypto.service";


@Injectable()
export class AuthService {

    constructor(
    @Inject('IPasswordRepository')
    private readonly passwordRepository: IPasswordRepository,
        private readonly createUserService: CreateUserService,
        private readonly findUserService: FindUserService,
        private readonly jwtService: JwtService,
        private readonly createJournalistService: CreateJournalistService,
        private readonly cryptoService: CryptoService,
      ){}

async register(registerDTO: CreateUserWithPasswordDto) {
  const user = await this.createUserService.create(registerDTO);
  const payload = {
    email: user.UserEmail,
    role: user.RoleAssigned,
    userID: user.UserID
  };
  const token = await this.jwtService.signAsync(payload);
  return { token };
}


async login(loginDTO: LoginUserDto) {
  const user = await this.findUserService.findUserByEmail(loginDTO.UserEmail);

  const allPasswords = await this.passwordRepository.findAll();
  const userPassword = allPasswords.find(p => p.UserID === user.UserID);

  const secretKey = process.env.ENCRYPTION_KEY;
  const decryptedPassword = this.cryptoService.decrypt(userPassword.PasswordUser, secretKey);

  const isPasswordValid = decryptedPassword === loginDTO.PasswordUser;
  if (!isPasswordValid) {
    throw new UnauthorizedException('Incorrect password.');
  }

  const payload: any = {
    email: user.UserEmail,
    role: user.RoleAssigned,
    userID: user.UserID,
  };

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


  async loginLocalUser(loginDTO: ValidatedUserDto) {
  const payload: any = {
    email: loginDTO.email,
    role: loginDTO.role,
    userID: loginDTO.id,
  };

  if (loginDTO.journalistID) {
    payload.journalistID = loginDTO.journalistID;
  }

  const token = await this.jwtService.signAsync(payload);
  return { token: token };
  }

async validateUser(email: string, password: string): Promise<ValidatedUserDto | null> {
  const user = await this.findUserService.findUserByEmail(email);
  if (!user) return null;

  const allPasswords = await this.passwordRepository.findAll();
  const userPassword = allPasswords.find(p => p.UserID === user.UserID);
  if (!userPassword) return null;

  const secretKey = process.env.ENCRYPTION_KEY;
  const decryptedPassword = this.cryptoService.decrypt(userPassword.PasswordUser, secretKey);

  const isPasswordValid = decryptedPassword === password;
  if (!isPasswordValid) return null;

  const validatedUser: ValidatedUserDto = {
    id: user.UserID,
    email: user.UserEmail,
    role: user.RoleAssigned,
  };

  if (user.JournalistID) {
    validatedUser.journalistID = user.JournalistID;
  }

  return validatedUser;
}


}