import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { VerificationStatus } from 'src/DomainLayer/Entities/applicationForm.entity';
import { RoleAssigned } from 'src/DomainLayer/Entities/roles.entity';

export class UpdateRolesDto {

    @ApiProperty({
        description: 'el rol del usuario',
        example: 'Reader',
      })
  @IsNotEmpty()
  @IsEnum(RoleAssigned, { message: 'RoleAssigned must be a valid enum value' })
  roleAssigned: RoleAssigned;
}
