/*
  Warnings:

  - You are about to drop the column `groupId` on the `missions` table. All the data in the column will be lost.
  - Added the required column `group_id` to the `missions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `missions` DROP FOREIGN KEY `missions_groupId_fkey`;

-- AlterTable
ALTER TABLE `missions` DROP COLUMN `groupId`,
    ADD COLUMN `group_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `missions` ADD CONSTRAINT `missions_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
