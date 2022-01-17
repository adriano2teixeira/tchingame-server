import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { DokanService } from './dokan.service';
import { StorsController } from './stores.controller';
import { StoresService } from './stores.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    HttpModule.register({
      baseURL: 'https://tchingame.com/wp-json/dokan/v1/',
    }),
  ],
  providers: [DokanService, StoresService],
  controllers: [StorsController],
})
export class StoresModule {}
