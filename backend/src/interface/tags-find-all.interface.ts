import { Tweet } from './tweet.interface';

export class TagsFindAll {
  id: number;
  tagName: string;
  isSelf: boolean;
  tweets: Tweet[];
}
