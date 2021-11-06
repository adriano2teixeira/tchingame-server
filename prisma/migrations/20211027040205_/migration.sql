/*
  Warnings:

  - Added the required column `product_id` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Voucher` ADD COLUMN `product_id` INTEGER NOT NULL,
    ADD COLUMN `store_id` INTEGER NOT NULL;
