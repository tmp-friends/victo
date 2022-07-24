import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TweetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
