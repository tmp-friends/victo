import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Vtuber, Prisma } from '@prisma/client';

@Injectable()
export class TestsService {
  constructor(private prisma: PrismaService) {}

  async vtubers(): Promise<Vtuber[]> {
    return this.prisma.vtuber.findMany();
  }
}
