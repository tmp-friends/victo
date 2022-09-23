import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaConfig } from 'src/config/prisma/prisma.config';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';

@Module({
  imports: [ConfigModule],
  controllers: [BatchController],
  providers: [PrismaConfig, BatchService],
})
export class BatchModule {}
