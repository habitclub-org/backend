/*
  Warnings:

  - A unique constraint covering the columns `[user_id,mission_id]` on the table `user_mission_statistics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_mission_statistics_user_id_mission_id_key` ON `user_mission_statistics`(`user_id`, `mission_id`);
