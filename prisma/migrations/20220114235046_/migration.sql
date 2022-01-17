-- CreateTable
CREATE TABLE `Voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `order_id` INTEGER NULL,
    `reference` VARCHAR(191) NULL,
    `product_id` INTEGER NOT NULL,
    `store_id` INTEGER NOT NULL,
    `product_name` VARCHAR(191) NOT NULL,
    `qty` INTEGER NOT NULL,
    `store_name` VARCHAR(191) NOT NULL,
    `status` ENUM('EXPIRED', 'ACTIVE', 'USED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `userDisplayName` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `userUid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Voucher_reference_key`(`reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
