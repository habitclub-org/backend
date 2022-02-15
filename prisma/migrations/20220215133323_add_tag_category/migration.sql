-- AlterTable
ALTER TABLE `tags` ADD COLUMN `category_id` INTEGER NULL AFTER `name`;

-- CreateTable
CREATE TABLE `tag_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tag_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
