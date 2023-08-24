import { CacheModule, Module, forwardRef } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { UserModule } from '../user/user.module';
import { CacheConfigService } from '@config/cache-config.service';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
  imports: [
    UserModule,
    CacheModule.registerAsync({
      useClass: CacheConfigService,
    }),
  ],
})
export class CaslModule {}
