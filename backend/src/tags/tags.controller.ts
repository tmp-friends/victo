import {
  Controller,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async findAll(
    // @Queryがstringでしか取得できないので、ParseIntPipeでnumber型に変換
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take: number,
  ): Promise<any> {
    return this.tagsService.findAll(skip, take);
  }
}
