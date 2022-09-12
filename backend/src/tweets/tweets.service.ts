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
      const hashtagList = await this.getHashtagList();

      for await (const hashtag of hashtagList) {
        const tweets = await this.fetchTweets(hashtag);
        await this.insertTweets(tweets);
      }
    } catch(e) {
      console.log(e);
    }
  }

  private async getHashtagList(): Promise<string[]> {
    const hashtags = await this.prisma.hashtag.findMany();

    const hashtagList = [];
    for await (const hashtag of hashtags) {
      hashtagList.push(hashtag['tagName']);
    }

    return hashtagList;
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

    const tweets = []
    for await (const fanartTweet of fanartTweets) {
      const [text, tweetUrl] = await this.extractTweetUrl(fanartTweet['text']);

      const tweet = {
        tweet_id: fanartTweet['id'],
        text: text,
        retweet_count: Number(fanartTweet['public_metrics']['retweet_count']),
        like_count: Number(fanartTweet['public_metrics']['like_count']),
        author_id: fanartTweet['author_id'],
        tweet_url: tweetUrl,
        tweeted_at: new Date(fanartTweet['created_at']),
      };

      // media.fieldsは追加情報のため別処理
      const mediaFields = fanartTweets.includes.medias(fanartTweet);
      // 画像は複数枚ある
      const media = [];
      for await (const mediaField of mediaFields) {
        const shapedMediaField = {
          type: mediaField['type'],
          url: mediaField['url'],
        };
        media.push(shapedMediaField);
      }
      tweet['media'] = media;

      tweets.push(tweet);
    }
    // console.log(tweets);

    // TODO: TWEETS型を作って格納しreturnする
    return tweets;
  }

  private async setWithinTime(): Promise<string[]> {
    const date = new Date();

    // ISO規格
    // getMonth()は0はじまりのため1加算する必要あり
    // TODO: 日本の時間に合わせる
    const yesterdayMidnight =
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}T00:00:00Z`;
    const todayMidnight =
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T00:00:00Z`;

    return [yesterdayMidnight, todayMidnight];
  }

  private async extractTweetUrl(tweetText: string): Promise<string[]> {
    // https://t.co/<空白以外の1文字以上>
    const tweetUrl = tweetText.match(/https:\/\/t\.co\/\S*$/)[0];
    const text = tweetText.replace(` ${tweetUrl}`, '')

    return [text, tweetUrl];
  }

  private async insertTweets(tweets: string[]): Promise<void> {
    const test = {
      hashtagId: 2,
      tweetDataId: '1569345337839730688',
      text: 'VRやってみたい\n1573話\n#凛Art\n#ギルザレン画廊 \n#ムギザレン',
      retweetCount: 21,
      likeCount: 154,
      authorId: '2394220412',
      tweetUrl: 'https://t.co/cXsCbK9eDv',
      tweetedAt: new Date('2022-09-12T15:21:00.000Z'),
      // TODO: 現在時刻を挿入する
      createdAt: new Date('2022-09-12T15:21:00.000Z'),
      updatedAt: new Date('2022-09-12T15:21:00.000Z'),
      media: {
        create: {
          type: '',
          url: '',
        },
      },
    };

    await this.prisma.tweet.create({ data: test });
  }
}
