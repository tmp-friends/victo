import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TweetsService {
  private roClient;

  constructor(private configService: ConfigService) {
    const BEARER_TOKEN = this.configService.get<string>('BEARER_TOKEN');
    console.log(BEARER_TOKEN);
    const client = new TwitterApi(BEARER_TOKEN);
    this.roClient = client.readOnly;
  }

  public async fetchFanartTweets() {
    const fanartTweets = await this.roClient.v2.search(
      await this.generateSeachKeyword(),
      {
        // TODO: start_timeを設定する処理を別関数として作成する
        start_time: '2022-08-12T04:50:40Z',
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

  private async generateSeachKeyword() {
    const excludeRetweet = '-is:retweet';
    const hasMedia = 'has:media';

    return `#みとあーと ${excludeRetweet} ${hasMedia}`;
  }
}
