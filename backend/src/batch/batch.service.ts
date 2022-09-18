import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi, TwitterApiReadOnly, TweetSearchRecentV2Paginator } from 'twitter-api-v2';
import { PrismaConfig } from 'src/config/prisma/prisma.config';

import { Hashtag } from 'src/interface/hashtag.interface';
import { CreateTweetData } from 'src/interface/create-tweet-data.interface';
import { CreateMediaData } from 'src/interface/create-media-data.interface';

@Injectable()
export class BatchService {
  private roClient: TwitterApiReadOnly;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaConfig,
  ) {
    const BEARER_TOKEN = this.configService.get<string>('BEARER_TOKEN');
    const client = new TwitterApi(BEARER_TOKEN);
    this.roClient = client.readOnly;
  }

  /**
   * @remarks
   * ツイートを取得し、DBにインサートするバッチ処理
   */
  public async main(): Promise<void> {
    // TODO: NestJSのschedule機能を使用する
    try {
      const hashtagList: Hashtag[] = await this.prisma.hashtag.findMany();

      for await (const hashtag of hashtagList) {
        const fanartTweets = await this.fetchTweets(hashtag['tagName']);
        await this.insertTweets(hashtag['id'], fanartTweets);
      }
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * @remarks
   * TwitterAPIを用いて前日分のツイートを取得する処理
   *
   * @param hashtag - 取得したいツイートに付与されているハッシュタグ名
   * @returns 取得したツイート配列
   */
  private async fetchTweets(hashtag: string): Promise<TweetSearchRecentV2Paginator> {
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

  /**
   * @remarks
   * (日本標準時間で)前日の開始と終了の時刻を取得する処理
   *
   * @returns [yesterdayMidnight, todayMidnight] - [前日深夜0時, 本日深夜0時]
   */
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

  /**
   * @remarks
   * ツイートをDBにインサートする処理
   *
   * @param id - Hashtagの番号
   * @param fanartTweets - twitter-api-v2で取得したツイート配列
   */
  private async insertTweets(id: number, fanartTweets: TweetSearchRecentV2Paginator): Promise<void> {
    for await (const fanartTweet of fanartTweets) {
      const [text, tweetUrl] = await this.extractTweetUrl(fanartTweet['text']);

      const data: CreateTweetData = {
        hashtagId: id,
        tweetDataId: fanartTweet['id'],
        text: text,
        retweetCount: Number(fanartTweet['public_metrics']['retweet_count']),
        likeCount: Number(fanartTweet['public_metrics']['like_count']),
        authorId: fanartTweet['author_id'],
        tweetUrl: tweetUrl,
        tweetedAt: new Date(fanartTweet['created_at']),
        media: {
          create: [],
        },
      };

      // media.fieldsは追加情報のため別処理
      const mediaFields = fanartTweets.includes.medias(fanartTweet);
      // 画像は複数枚ある
      const media = [];
      for await (const mediaField of mediaFields) {
        const mediaData: CreateMediaData = {
          type: mediaField['type'],
          url: mediaField['url'],
        };
        media.push(mediaData);
      }
      data['media']['create']= media;

      await this.prisma.tweet.create({ data });
    }
  }

  /**
   * @remarks
   * ツイート本文に含まれているツイートURLを抽出する処理
   *
   * @params tweetText - ツイート本文
   * @returns [text, tweetUrl] - [ツイート本文, ツイートURL]
   */
  private async extractTweetUrl(tweetText: string): Promise<string[]> {
    // https://t.co/<空白以外の1文字以上>
    const tweetUrl = tweetText.match(/https:\/\/t\.co\/\S*$/)[0];
    const text = tweetText.replace(` ${tweetUrl}`, '')

    return [text, tweetUrl];
  }
}
