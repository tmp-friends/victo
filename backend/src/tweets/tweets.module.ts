import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {PrismaService} from 'src/prisma.service';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  imports: [ConfigModule],
  controllers: [TweetsController],
  providers: [TweetsService, PrismaService]
})
export class TweetsModule {}
