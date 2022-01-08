-- AlterTable
ALTER TABLE `missions` ADD COLUMN `check_end_time` DATETIME(3) NULL,
    ADD COLUMN `check_start_time` DATETIME(3) NULL;
