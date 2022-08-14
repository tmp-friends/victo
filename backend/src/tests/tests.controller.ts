import {
  Controller,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { Vtuber } from '@prisma/client';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService){}

  @Get()
  async vtubers(): Promise<string> {
    return this.testsService.vtubers();
  }
}
