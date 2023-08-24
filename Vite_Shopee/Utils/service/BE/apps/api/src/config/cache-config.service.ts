import { Injectable, CacheModuleOptions, CacheOptionsFactory } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    let cacheConfig: any = {
      ttl: parseInt(process.env.CACHE_TTL) || 1500,
    }

    const cacheProvider = process.env.CACHE_PROVIDER || 'memory';
    if (cacheProvider === 'redisStore') {
      cacheConfig.store = redisStore;
      cacheConfig.host = process.env.CACHE_REDIS_HOST || 'localhost';
      cacheConfig.port = parseInt(process.env.CACHE_REDIS_PORT) || 6379;
      if (process.env.CACHE_REDIS_AUTH_PASS) {
        cacheConfig.auth_pass = process.env.CACHE_REDIS_AUTH_PASS;
      }
    }

    return cacheConfig;
  }
}