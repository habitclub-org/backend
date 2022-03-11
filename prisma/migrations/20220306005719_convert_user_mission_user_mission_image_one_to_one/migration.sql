/*
  Warnings:

  - A unique constraint covering the columns `[user_mission_id]` on the table `user_mission_images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_mission_images_user_mission_id_key` ON `user_mission_images`(`user_mission_id`);
