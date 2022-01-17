/*
  Warnings:

  - Added the required column `total` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Voucher` ADD COLUMN `total` INTEGER NOT NULL;
