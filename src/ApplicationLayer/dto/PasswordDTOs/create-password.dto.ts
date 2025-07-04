import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    Matches,
    IsOptional,
  } from 'class-validator';
  
  export class CreatePasswordDto {
    @ApiProperty({
        description: 'The users password',
        example: 'Password@123',
      })
    @Transform(({value}) => value.trim())  
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])/,{message: 'Password must contain at least one lowercase letter.',},)
    @Matches(/^(?=.*[A-Z])/,{message: 'Password must contain at least one uppercase letter.',},)
    @Matches(/^(?=.*\d)/,{message: 'Password must contain at least one number.',},)
    @Matches( /^(?=.*[@$!%*?&])/,{message: 'Password must contain at least one special character.',},)
    @Matches(/^(?=[A-Za-z\d@$!%*?&]{8,})/, { message: 'Password must be at least 8 characters long.',},)
    readonly PasswordUser: string;
  
  }
  