import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from 'src/ApplicationLayer/UseCases/AuthUserCases/auth.useCases';
import { AuthController } from 'src/InterfaceAdaptersLayer/Controllers/auth.controller';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constants';
import { JournalistModule } from './journalist.module';
import { LocalStrategy } from 'src/ApplicationLayer/Authentication_and_authorization/local.strategy';
import { BasicStrategy } from 'src/ApplicationLayer/Authentication_and_authorization/basic.strategy';

@Module({

imports: [
  forwardRef(() => UserModule),
  forwardRef(() => JournalistModule),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),
],

  providers: [

     AuthService,
     BasicStrategy,
     LocalStrategy

    ], 
  controllers: [AuthController],
  exports: [

    AuthService,
    BasicStrategy,
     LocalStrategy

  ],   
})
export class AuthModule {}