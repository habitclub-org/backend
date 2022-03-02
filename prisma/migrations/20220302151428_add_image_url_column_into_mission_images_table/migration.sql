/*
  Warnings:

  - Added the required column `image_url` to the `user_mission_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_mission_images` ADD COLUMN `image_url` VARCHAR(191) NOT NULL AFTER `user_mission_id`;
