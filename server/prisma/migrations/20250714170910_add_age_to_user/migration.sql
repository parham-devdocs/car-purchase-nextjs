/*
  Warnings:

  - You are about to drop the column `address` on the `PickupData` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `PickupData` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `PickupData` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `PickupData` table. All the data in the column will be lost.
  - You are about to drop the `returnData` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `PickupData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `PickupData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "returnData" DROP CONSTRAINT "returnData_reservationId_fkey";

-- DropIndex
DROP INDEX "PickupData_type_key";

-- AlterTable
ALTER TABLE "PickupData" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "type",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "returnData";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReturnData" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "reservationId" INTEGER NOT NULL,

    CONSTRAINT "ReturnData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReturnData_locationId_key" ON "ReturnData"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "ReturnData_reservationId_key" ON "ReturnData"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "PickupData_locationId_key" ON "PickupData"("locationId");

-- AddForeignKey
ALTER TABLE "ReturnData" ADD CONSTRAINT "ReturnData_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnData" ADD CONSTRAINT "ReturnData_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickupData" ADD CONSTRAINT "PickupData_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
