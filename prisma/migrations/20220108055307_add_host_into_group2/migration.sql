/*
  Warnings:

  - You are about to drop the column `hostId` on the `groups` table. All the data in the column will be lost.
  - Added the required column `host_id` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `groups` DROP FOREIGN KEY `groups_hostId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `groups` DROP COLUMN `hostId`,
    ADD COLUMN `host_id` INTEGER NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_host_id_fkey` FOREIGN KEY (`host_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
