import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsOptional,
    Matches,
  } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({
    description: 'El primer nombre del usuario',
    example: 'John',
  })  
  @IsOptional()
  @IsString()
  readonly UserFirstName?: string;

  @ApiProperty({
    description: 'El apellido del usuario',
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  readonly UserLastName?: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario (debe terminar con @gmail.com)',
    example: 'johndoe@gmail.com',
  })
   @IsEmail()
   @IsOptional()
   @Matches(/^.+@gmail\.com$/, { message: 'Email must end with @gmail.com' })
  readonly UserEmail?: string;

  @ApiProperty({
    description: 'La URL de la imagen de perfil del usuario',
    example: 'http://example.com/profile.jpg',
  })  
  @IsOptional()
  @IsString()
  readonly UserImageURL?: string;

}
