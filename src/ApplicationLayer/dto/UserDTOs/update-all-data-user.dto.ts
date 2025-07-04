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
    description: 'User data to be update',
  })
  @ValidateNested()
  @Type(() => UpdateUserDto)
  @IsNotEmpty()
  readonly user: UpdateUserDto;


}