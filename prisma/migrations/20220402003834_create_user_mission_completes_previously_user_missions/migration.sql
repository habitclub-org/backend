/*
  Warnings:

  - You are about to drop the column `date` on the `user_missions` table. All the data in the column will be lost.
  - You are about to drop the `user_mission_images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_mission_images` DROP FOREIGN KEY `user_mission_images_user_mission_id_fkey`;

-- AlterTable
ALTER TABLE `user_missions` DROP COLUMN `date`;

-- DropTable
DROP TABLE `user_mission_images`;

-- CreateTable
CREATE TABLE `mission_completes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `date` DATE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mission_complete_id` INTEGER NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `mission_images_mission_complete_id_key`(`mission_complete_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mission_completes` ADD CONSTRAINT `mission_completes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission_completes` ADD CONSTRAINT `mission_completes_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `missions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission_images` ADD CONSTRAINT `mission_images_mission_complete_id_fkey` FOREIGN KEY (`mission_complete_id`) REFERENCES `mission_completes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
