import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { TestsService } from './tests/tests.service';
import { TestsController } from './tests/tests.controller';
import {PrismaService} from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TweetsModule
  ],
  controllers: [AppController, TestsController],
  providers: [AppService, TestsService, PrismaService],
})
export class AppModule {}
