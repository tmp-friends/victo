-- CreateTable
CREATE TABLE `Vtuber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `familyName` VARCHAR(191) NOT NULL,
    `givenName` VARCHAR(191) NOT NULL,
    `familyNameJa` VARCHAR(191) NOT NULL,
    `givenNameJa` VARCHAR(191) NOT NULL,
    `belongTo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tweet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `mediaKey` INTEGER NOT NULL,
    `vtuberId` INTEGER NOT NULL,

    INDEX `Tweet_vtuberId_idx`(`vtuberId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
