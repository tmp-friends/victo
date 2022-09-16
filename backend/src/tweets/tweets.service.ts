import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TweetsService {
  private roClient;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const BEARER_TOKEN = this.configService.get<string>('BEARER_TOKEN');
    const client = new TwitterApi(BEARER_TOKEN);
    this.roClient = client.readOnly;
  }

  // TODO: NestJSのschedule機能を使用する
  public async main(): Promise<void> {
    try {
      const hashtagList = await this.prisma.hashtag.findMany();

      for await (const hashtag of hashtagList) {
        const fanartTweets = await this.fetchTweets(hashtag['tagName']);
        await this.insertTweets(hashtag['id'], fanartTweets);
      }
    } catch(e) {
      console.log(e);
    }
  }

  private async fetchTweets(hashtag: string): Promise<string[]> {
    const searchKeyword = `#${hashtag} -is:retweet has:media`;
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

    return fanartTweets;
  }

  private async setWithinTime(): Promise<string[]> {
    // 日本標準時間で取得
    const date = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));

    // ISO規格
    // getMonth()は0はじまりのため1加算する必要あり
    const yesterdayMidnight =
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}T00:00:00+09:00`;
    const todayMidnight =
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T00:00:00+09:00`;

    return [yesterdayMidnight, todayMidnight];
  }

  private async insertTweets(id: number, fanartTweets: string[]): Promise<void> {
    for await (const fanartTweet of fanartTweets) {
      const [text, tweetUrl] = await this.extractTweetUrl(fanartTweet['text']);

      const data = {
        hashtagId: id,
        tweetDataId: fanartTweet['id'],
        text: text,
        retweetCount: Number(fanartTweet['public_metrics']['retweet_count']),
        likeCount: Number(fanartTweet['public_metrics']['like_count']),
        authorId: fanartTweet['author_id'],
        tweetUrl: tweetUrl,
        tweetedAt: new Date(fanartTweet['created_at']),
      };

      // media.fieldsは追加情報のため別処理
      const mediaFields = fanartTweets.includes.medias(fanartTweet);
      // 画像は複数枚ある
      const media = [];
      for await (const mediaField of mediaFields) {
        const mediaData = {
          type: mediaField['type'],
          url: mediaField['url'],
        };
        media.push(mediaData);
      }
      data['media']['create']= media;

      await this.prisma.tweet.create({ data });
    }
  }

  private async extractTweetUrl(tweetText: string): Promise<string[]> {
    // https://t.co/<空白以外の1文字以上>
    const tweetUrl = tweetText.match(/https:\/\/t\.co\/\S*$/)[0];
    const text = tweetText.replace(` ${tweetUrl}`, '')

    return [text, tweetUrl];
  }
}
