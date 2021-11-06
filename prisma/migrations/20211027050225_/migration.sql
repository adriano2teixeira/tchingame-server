/*
  Warnings:

  - Added the required column `product_name` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_name` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Voucher` ADD COLUMN `product_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `qty` INTEGER NOT NULL,
    ADD COLUMN `status` ENUM('EXPIRED', 'ACTIVE', 'USED') NOT NULL DEFAULT 'ACTIVE',
    ADD COLUMN `store_name` VARCHAR(191) NOT NULL;
