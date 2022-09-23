import { CreateMediaData } from './create-media-data.interface';

export class CreateTweetData {
  hashtagId: number;
  tweetDataId: string;
  text?: string;
  retweetCount: number;
  likeCount: number;
  authorId: string;
  tweetUrl: string;
  tweetedAt: Date;
  media: {
    create: CreateMediaData | null[];
  };
}
