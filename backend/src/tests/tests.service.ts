import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TestsService {
  constructor(private prisma: PrismaService) {}

  async vtubers(): Promise<string> {
    const test = this.prisma.vtuber.findMany();
    console.log('test');

    let vtuber: Prisma.VtuberCreateInput;

    vtuber = {
      name: '月ノ美兎',
      belongTo: 'にじさんじ',
    }

    await this.prisma.vtuber.create({ data: vtuber });

    return 'test';
  }
}
