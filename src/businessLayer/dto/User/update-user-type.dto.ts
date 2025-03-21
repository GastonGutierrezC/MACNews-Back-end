import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from '../../../dataLayer/entities/user.entity';

export class UpdateUserTypeDto {
  @IsNotEmpty()
  @IsEnum(UserType, { message: 'UserType must be a valid enum value' })
  UserType: UserType;
}
