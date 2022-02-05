-- AlterTable
ALTER TABLE `groups` ADD COLUMN `enrollment_availability` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `missions` MODIFY `check_end_time` TIME NULL,
    MODIFY `check_start_time` TIME NULL;
