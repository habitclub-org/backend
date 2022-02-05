/*
  Warnings:

  - You are about to drop the `user_mission_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_mission_status` DROP FOREIGN KEY `user_mission_status_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission_status` DROP FOREIGN KEY `user_mission_status_user_id_fkey`;

-- AlterTable
ALTER TABLE `missions` MODIFY `check_end_time` TIME NULL,
    MODIFY `check_start_time` TIME NULL;

-- DropTable
DROP TABLE `user_mission_status`;

-- CreateTable
CREATE TABLE `user_mission_statistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `total_check_needed` INTEGER NULL,
    `check_completed` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_mission_statistics` ADD CONSTRAINT `user_mission_statistics_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission_statistics` ADD CONSTRAINT `user_mission_statistics_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `missions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
