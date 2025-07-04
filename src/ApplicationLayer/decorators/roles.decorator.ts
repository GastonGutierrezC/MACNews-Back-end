import { SetMetadata } from "@nestjs/common";
import { RoleAssigned } from "src/DomainLayer/Entities/roles.entity";


export const ROLES_KEY = "roles";
export const Roles = (...roles: RoleAssigned[]) => SetMetadata(ROLES_KEY, roles);
