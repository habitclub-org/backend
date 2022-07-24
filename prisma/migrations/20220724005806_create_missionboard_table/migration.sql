-- CreateTable
CREATE TABLE `mission_boards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `board_id` INTEGER NOT NULL,
    `complete_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mission_boards` ADD CONSTRAINT `mission_boards_board_id_fkey` FOREIGN KEY (`board_id`) REFERENCES `boards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission_boards` ADD CONSTRAINT `mission_boards_complete_id_fkey` FOREIGN KEY (`complete_id`) REFERENCES `mission_completes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
