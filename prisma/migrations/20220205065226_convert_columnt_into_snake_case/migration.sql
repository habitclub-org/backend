/*
  Warnings:

  - You are about to drop the column `maximumMember` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailImageUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `groups` DROP COLUMN `maximumMember`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `maximum_member` INTEGER NOT NULL DEFAULT 12,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `missions` MODIFY `check_end_time` TIME NULL,
    MODIFY `check_start_time` TIME NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `thumbnailImageUrl`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `profile_image_url` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;
