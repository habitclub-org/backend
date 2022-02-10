/*
  Warnings:

  - You are about to drop the column `check_days` on the `user_mission_statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user_mission_statistics` DROP COLUMN `check_days`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `check_days` INTEGER NULL AFTER `profile_image_url`;
