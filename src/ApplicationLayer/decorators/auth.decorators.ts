import { applyDecorators, UseGuards } from "@nestjs/common";

import { Roles } from "./roles.decorator";
import { RoleAssigned } from "src/DomainLayer/Entities/roles.entity";
import { AuthGuard } from "../Authentication_and_authorization/guard/auth.guard";
import { RolesGuard } from "../Authentication_and_authorization/guard/role.guard";


export function Auth(roles: RoleAssigned | RoleAssigned[]) {
  const rolesArray = Array.isArray(roles) ? roles : [roles];
  return applyDecorators(Roles(...rolesArray), UseGuards(AuthGuard, RolesGuard));
}
