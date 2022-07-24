/*
  Warnings:

  - Added the required column `group_id` to the `boards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `boards` ADD COLUMN `group_id` INTEGER NOT NULL AFTER `user_id`;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
