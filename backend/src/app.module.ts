import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CorsMiddleware } from './config/cors.middleware';
import { TagsModule } from './tags/tags.module';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [ConfigModule.forRoot(), TagsModule, BatchModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
