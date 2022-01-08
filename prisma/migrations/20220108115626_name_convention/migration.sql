/*
  Warnings:

  - You are about to drop the column `groupId` on the `group_tags` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `group_tags` table. All the data in the column will be lost.
  - Added the required column `group_id` to the `group_tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_id` to the `group_tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `group_tags` DROP FOREIGN KEY `group_tags_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `group_tags` DROP FOREIGN KEY `group_tags_tagId_fkey`;

-- AlterTable
ALTER TABLE `group_tags` DROP COLUMN `groupId`,
    DROP COLUMN `tagId`,
    ADD COLUMN `group_id` INTEGER NOT NULL,
    ADD COLUMN `tag_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `group_tags` ADD CONSTRAINT `group_tags_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_tags` ADD CONSTRAINT `group_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
