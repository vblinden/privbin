-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `public_id` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `exposure` VARCHAR(191) NOT NULL DEFAULT 'never',
    `language` VARCHAR(191) NOT NULL,
    `private` BOOLEAN NOT NULL DEFAULT false,
    `hasPassword` BOOLEAN NOT NULL DEFAULT false,
    `created_at` BIGINT NOT NULL,
    `expire_at` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
