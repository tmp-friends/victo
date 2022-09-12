-- CreateTable
CREATE TABLE `Hashtag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tagName` VARCHAR(191) NOT NULL,
    `isSelf` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vtuber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `familyName` VARCHAR(191) NULL,
    `givenName` VARCHAR(191) NOT NULL,
    `hashtagId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tweet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tweetDataId` INTEGER NOT NULL,
    `text` VARCHAR(191) NULL,
    `retweetCount` INTEGER NOT NULL,
    `likeCount` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `tweetUrl` VARCHAR(191) NOT NULL,
    `tweetedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `hashtagId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tweetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
