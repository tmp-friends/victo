import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/config/prisma/prisma.config';

@Injectable()
export class TagsService {
  private DEFAULT_LIMIT = 30;

  constructor(private prisma: PrismaConfig) {}

  /**
   * @remarks
   * @param take - 取得する件数
   */
  public async findAll(skip: number, take: number): Promise<any> {
    const hashtagData = await this.prisma.hashtag.findMany({
      include: {
        tweets: {
          orderBy: {
            likeCount: 'desc',
          },
          take: 1,
        },
      },
    });

    // sort - いいね順にタグを並び替え
    hashtagData.sort((prevObject, nextObject) =>
      prevObject.tweets[0].likeCount < nextObject.tweets[0].likeCount ? 1 : -1,
    );

    // offset, limit
    const result = hashtagData.slice(
      skip,
      take === 0 ? this.DEFAULT_LIMIT : take,
    );
    console.log(result);
    return result;
  }
}
