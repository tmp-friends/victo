import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BatchModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
