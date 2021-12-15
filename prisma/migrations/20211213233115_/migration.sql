-- CreateEnum
CREATE TYPE "UserGenderType" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "VoucherStatusType" AS ENUM ('EXPIRED', 'ACTIVE', 'USED');

-- CreateTable
CREATE TABLE "Voucher" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" INTEGER NOT NULL,
    "reference" TEXT,
    "product_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "store_name" TEXT NOT NULL,
    "status" "VoucherStatusType" NOT NULL DEFAULT E'ACTIVE',
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo_url" TEXT,
    "user_firebase" TEXT,
    "address" TEXT,
    "phone_number" INTEGER,
    "gender" "UserGenderType",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_reference_key" ON "Voucher"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_firebase_key" ON "User"("user_firebase");

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
