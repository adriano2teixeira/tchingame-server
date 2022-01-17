/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `Voucher` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Voucher_order_id_key` ON `Voucher`(`order_id`);
