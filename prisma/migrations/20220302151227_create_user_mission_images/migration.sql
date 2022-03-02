-- CreateTable
CREATE TABLE `user_mission_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_mission_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_mission_images` ADD CONSTRAINT `user_mission_images_user_mission_id_fkey` FOREIGN KEY (`user_mission_id`) REFERENCES `user_missions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
