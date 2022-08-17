import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const vtuberData: Prisma.VtuberCreateInput[] = [
  {
    familyName: 'tsukino',
    givenName: 'mito',
    familyNameJa: '月ノ',
    givenNameJa: '美兎',
    belongTo: 'nijisanji',
  },
  {
    familyName: 'higuchi',
    givenName: 'kaede',
    familyNameJa: '樋口',
    givenNameJa: '楓',
    belongTo: 'nijisanji',
  },
  {
    familyName: 'sizuka',
    givenName: 'rin',
    familyNameJa: '静',
    givenNameJa: '凛',
    belongTo: 'nijisanji',
  },
];

const transfar = async () => {
  const vtubers = [];
  for (const v of vtuberData) {
    const vtuber = prisma.vtuber.create({
      data: v,
    });

    vtubers.push(vtuber);
  }

  return await prisma.$transaction(vtubers);
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
