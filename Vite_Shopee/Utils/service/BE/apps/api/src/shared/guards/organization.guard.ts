import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { defaultOrganizationId } from '@constants/variable.const';

@Injectable()
export class OrganizationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const xOrganizationId = request.headers['x-organization-id'] ?? defaultOrganizationId;
    const matchedOrganization = request.user.organizations.filter((item) => item.id === +xOrganizationId);
    if (matchedOrganization && matchedOrganization.length > 0) return true;
    return false;
  }
}
