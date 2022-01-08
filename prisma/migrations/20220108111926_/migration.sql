/*
  Warnings:

  - You are about to drop the column `missionTypeId` on the `missions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `missions` DROP FOREIGN KEY `missions_missionTypeId_fkey`;

-- AlterTable
ALTER TABLE `missions` DROP COLUMN `missionTypeId`;
