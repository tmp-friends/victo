import { Controller, Get } from '@nestjs/common';

@Controller('tweets')
export class TweetsController {
  @Get()
  tweets() {
    return 'Tweets';
  }
}
