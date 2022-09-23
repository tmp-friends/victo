import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/config/prisma/prisma.config';

import { TagsFindAll } from 'src/interface/tags-find-all.interface';

@Injectable()
export class TagsService {
  private DEFAULT_LIMIT = 30;

  constructor(private prisma: PrismaConfig) {}

  /**
   * @remarks
   * 全てのタグのlikeCountが最も多いツイートを1件取得し、
   * そのツイートのlikeCount順にタグを並び替える
   *
   * @param skip - 取得する開始位置
   * @param take - 取得する件数
   * @returns [Hashtag + Tweet + Media]
   */
  public async findAll(skip: number, take: number): Promise<TagsFindAll[]> {
    const hashtagData: TagsFindAll[] = await this.prisma.hashtag.findMany({
      include: {
        tweets: {
          include: {
            media: true,
          },
          orderBy: {
            likeCount: 'desc',
          },
          take: 1,
        },
      },
    });

    // sort - いいね順にタグを並び替え
    hashtagData.sort((prevObject: TagsFindAll, nextObject: TagsFindAll) =>
      prevObject.tweets[0].likeCount < nextObject.tweets[0].likeCount ? 1 : -1,
    );

    // offset, limit
    const result = hashtagData.slice(
      skip,
      take === 0 ? this.DEFAULT_LIMIT : take,
    );

    return result;
  }
}
