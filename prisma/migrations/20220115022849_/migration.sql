/*
  Warnings:

  - Added the required column `productPrice` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Voucher` ADD COLUMN `productPrice` INTEGER NOT NULL,
    ADD COLUMN `sellPrice` INTEGER NOT NULL;
