/*
  Warnings:

  - You are about to drop the column `groupId` on the `user_groups` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_groups` table. All the data in the column will be lost.
  - Added the required column `group_id` to the `user_groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_groups` DROP FOREIGN KEY `user_groups_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `user_groups` DROP FOREIGN KEY `user_groups_userId_fkey`;

-- AlterTable
ALTER TABLE `user_groups` DROP COLUMN `groupId`,
    DROP COLUMN `userId`,
    ADD COLUMN `group_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `user_groups` ADD CONSTRAINT `user_groups_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_groups` ADD CONSTRAINT `user_groups_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
