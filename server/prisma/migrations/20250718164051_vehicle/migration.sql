/*
  Warnings:

  - You are about to alter the column `pricePerDay` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "pricePerDay" SET DATA TYPE INTEGER;
