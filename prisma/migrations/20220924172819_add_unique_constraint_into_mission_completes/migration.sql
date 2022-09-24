/*
  Warnings:

  - A unique constraint covering the columns `[user_id,mission_id,date]` on the table `mission_completes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `mission_completes_user_id_mission_id_date_key` ON `mission_completes`(`user_id`, `mission_id`, `date`);
