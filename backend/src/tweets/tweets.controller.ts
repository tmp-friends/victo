import { Controller, Get } from '@nestjs/common';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetsService: TweetsService) {}

  @Get()
  tweets() {
    return this.tweetsService.fetchFanartTweets();
  }
}
