/*
  Warnings:

  - Added the required column `numberPlate` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "numberPlate" INTEGER NOT NULL;
