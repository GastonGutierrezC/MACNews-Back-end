import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { CreatePasswordDto } from '../PasswordDTOs/create-password.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserWithPasswordDto {
  @ApiProperty({
    type: CreateUserDto,
    description: 'Datos del usuario a crear',
  })
  @ValidateNested()
  @Type(() => CreateUserDto)
  @IsNotEmpty()
  readonly user: CreateUserDto;

  @ApiProperty({
    type: CreatePasswordDto,
    description: 'Datos de la contraseña del usuario',
  })
  @ValidateNested()
  @Type(() => CreatePasswordDto)
  @IsNotEmpty()
  readonly password: CreatePasswordDto;
}
