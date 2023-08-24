import { CACHE_MANAGER, ExecutionContext, Injectable, Inject, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';
import { CaslAbilityFactory, AppAbility } from '../casl-ability.factory';
import { PolicyHandler } from '../interfaces/permission-handler.interface';
import { Cache } from 'cache-manager';
import { CACHE_KEY_ABILITY_BUILDER_USER } from '@constants/cache.constant';
import { defaultOrganizationId } from '@constants/variable.const';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(CACHE_MANAGER) public cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];
    
    const { user, headers } = context.switchToHttp().getRequest();
    const xOrganizationId = headers['x-organization-id'] ?? defaultOrganizationId;
    
    const ability = await this.caslAbilityFactory.createForUser(user, +xOrganizationId);
    const cacheKey = `${CACHE_KEY_ABILITY_BUILDER_USER}${user.id}`;
    await this.cacheManager.set(cacheKey, ability, { ttl: null });

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}