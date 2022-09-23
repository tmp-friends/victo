import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/config/prisma/prisma.config';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [],
  controllers: [TagsController],
  providers: [PrismaConfig, TagsService],
})
export class TagsModule {}
