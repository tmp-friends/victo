import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [ConfigModule.forRoot(), TagsModule, BatchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
