import { Media } from './media.interface';

export class Tweet {
  id: number;
  tweetDataId: string;
  text?: string;
  retweetCount: number;
  likeCount: number;
  authorId: string;
  tweetUrl: string;
  tweetedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  hashtagId: number;
  media: Media[];
}
