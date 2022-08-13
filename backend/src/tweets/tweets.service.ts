import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TweetsService {
  private roClient;

  constructor(private configService: ConfigService) {
    const BEARER_TOKEN = this.configService.get<string>('BEARER_TOKEN');
    const client = new TwitterApi(BEARER_TOKEN);
    this.roClient = client.readOnly;
  }

  public async fetchFanartTweets() {
    const searchKeyword = await this.generateSeachKeyword();
    const [yesterdayMidnight, todayMidnight] = await this.setWithinTime();

    const fanartTweets = await this.roClient.v2.search(
      searchKeyword,
      {
        start_time: yesterdayMidnight,
        end_time: todayMidnight,
        expansions: ['author_id', 'attachments.media_keys'],
        'tweet.fields': ['created_at', 'public_metrics'],
        'media.fields': ['preview_image_url', 'url'],
      }
    );

    for await (const fanartTweet of fanartTweets) {
      const medias = fanartTweets.includes.medias(fanartTweet);
      const tweet = { data: fanartTweet, media: medias[0] };
      console.log(tweet);
    }
  }

  private async generateSeachKeyword(): Promise<string> {
    const excludeRetweet = '-is:retweet';
    const hasMedia = 'has:media';

    return `#みとあーと ${excludeRetweet} ${hasMedia}`;
  }

  private async setWithinTime(): Promise<string[]> {
    const date = new Date();

    // ISO規格
    // getMonth()は0はじまりのため1加算する必要あり
    const yesterdayMidnight =
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}T00:00:00Z`;
    const todayMidnight =
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T00:00:00Z`;

    return [yesterdayMidnight, todayMidnight];
  }
}
