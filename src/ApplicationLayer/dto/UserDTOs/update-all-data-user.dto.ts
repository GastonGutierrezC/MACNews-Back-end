import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { CreatePasswordDto } from '../PasswordDTOs/create-password.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUserDto } from './update-user.dto';
import { UpdatePasswordDto } from '../PasswordDTOs/update-password.dto';

export class UpdateUserWithPasswordDto {
  @ApiProperty({
    type: UpdateUserDto,
    description: 'Datos del usuario a actualizar',
  })
  @ValidateNested()
  @Type(() => UpdateUserDto)
  @IsNotEmpty()
  readonly user: UpdateUserDto;

  @ApiProperty({
    type: UpdatePasswordDto,
    description: 'Datos de la contraseña del actualizar',
  })
  @ValidateNested()
  @Type(() => UpdatePasswordDto)
  @IsNotEmpty()
  readonly password: UpdatePasswordDto;
}