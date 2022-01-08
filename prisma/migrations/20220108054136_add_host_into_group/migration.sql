/*
  Warnings:

  - Added the required column `hostId` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `groups` ADD COLUMN `hostId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
