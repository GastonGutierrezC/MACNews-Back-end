import { applyDecorators, UseGuards } from "@nestjs/common";

import { Roles } from "./roles.decorator";
import { RoleAssigned } from "src/DomainLayer/Entities/roles.entity";
import { AuthGuard } from "../UseCases/AuthUserCases/guard/auth.guard";
import { RolesGuard } from "../UseCases/AuthUserCases/guard/role.guard";

export function Auth(roles: RoleAssigned | RoleAssigned[]) {
  const rolesArray = Array.isArray(roles) ? roles : [roles];
  return applyDecorators(Roles(...rolesArray), UseGuards(AuthGuard, RolesGuard));
}
