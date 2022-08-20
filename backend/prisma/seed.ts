import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const hashtagData: Prisma.HashtagCreateInput[] = [
  {
    tagName: 'みとあーと',
    isSelf: true,
    vtubers: {
      create: [
        {
          familyName: '月ノ',
          givenName: '美兎',
        },
      ],
    },
  },
  {
    tagName: 'でろあーと',
    isSelf: true,
    vtubers: {
      create: [
        {
          familyName: '樋口',
          givenName: '楓',
        },
      ],
    },
  },
  {
    tagName: '凛Art',
    isSelf: true,
    vtubers: {
      create: [
        {
          familyName: '静',
          givenName: '凛',
        },
      ],
    },
  },
];

const transfar = async () => {
  const hashtags = [];
  for (const v of hashtagData) {
    const hashtag = prisma.hashtag.create({
      data: v,
    });

    hashtags.push(hashtag);
  }

  return await prisma.$transaction(hashtags);
}

const main = async () => {
  console.log('Start seeding ...');

  await transfar();

  console.log('Seeeding finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
