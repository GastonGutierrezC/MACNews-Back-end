import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/ApplicationLayer/decorators/roles.decorator";
import { RoleAssigned } from "src/DomainLayer/Entities/roles.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleAssigned[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Si el usuario es administrador, siempre se permite el acceso
    if (user.role === RoleAssigned.Administrator) {
      return true;
    }

    // Permite si el rol del usuario está entre los requeridos
    return requiredRoles.includes(user.role);
  }
}
