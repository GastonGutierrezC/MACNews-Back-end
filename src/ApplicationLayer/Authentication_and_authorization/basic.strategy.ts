
import { BasicStrategy as BasicStrategyPassport } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../UseCases/AuthUserCases/auth.useCases';


@Injectable()
export class BasicStrategy extends PassportStrategy(BasicStrategyPassport, 'basic') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }
}
