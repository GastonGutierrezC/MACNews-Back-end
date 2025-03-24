import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class CreateUserDto {
  @ApiProperty({
    description: 'El primer nombre del usuario',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly UserFirstName: string;

  @ApiProperty({
    description: 'El apellido del usuario',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly UserLastName: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario (debe terminar con @gmail.com)',
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^.+@gmail\.com$/, { message: 'Email must end with @gmail.com' })
  readonly UserEmail: string;

  @ApiProperty({
    description: 'La URL de la imagen de perfil del usuario',
    example: 'http://example.com/profile.jpg',
  })
  @IsOptional()
  @IsString()
  readonly UserImageURL: string;


}
