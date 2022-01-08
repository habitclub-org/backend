/*
  Warnings:

  - You are about to drop the column `mission_type_id` on the `missions` table. All the data in the column will be lost.
  - Added the required column `mission_type_id` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `missions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `missions` DROP FOREIGN KEY `missions_mission_type_id_fkey`;

-- AlterTable
ALTER TABLE `groups` ADD COLUMN `mission_type_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `missions` DROP COLUMN `mission_type_id`,
    ADD COLUMN `groupId` INTEGER NOT NULL,
    ADD COLUMN `missionTypeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_mission_type_id_fkey` FOREIGN KEY (`mission_type_id`) REFERENCES `mission_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `missions` ADD CONSTRAINT `missions_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `missions` ADD CONSTRAINT `missions_missionTypeId_fkey` FOREIGN KEY (`missionTypeId`) REFERENCES `mission_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
