/*
  Warnings:

  - You are about to drop the column `optionsId` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the `Options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PickupData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReturnData` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pickupLocationId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[returnLocationId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pickupDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLocationId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnLocationId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VehicleOptions" AS ENUM ('CruiseControl', 'AirConditioner', 'RWD', 'BlueTooth', 'Sunroof', 'LeatherSeats', 'GasolineVehicle');

-- DropForeignKey
ALTER TABLE "PickupData" DROP CONSTRAINT "PickupData_locationId_fkey";

-- DropForeignKey
ALTER TABLE "PickupData" DROP CONSTRAINT "PickupData_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "ReturnData" DROP CONSTRAINT "ReturnData_locationId_fkey";

-- DropForeignKey
ALTER TABLE "ReturnData" DROP CONSTRAINT "ReturnData_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_optionsId_fkey";

-- DropIndex
DROP INDEX "Vehicle_optionsId_key";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "pickupDate" TEXT NOT NULL,
ADD COLUMN     "pickupLocationId" INTEGER NOT NULL,
ADD COLUMN     "pickupTime" TEXT NOT NULL,
ADD COLUMN     "returnDate" TEXT NOT NULL,
ADD COLUMN     "returnLocationId" INTEGER NOT NULL,
ADD COLUMN     "returnTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "optionsId",
ADD COLUMN     "options" "VehicleOptions"[];

-- DropTable
DROP TABLE "Options";

-- DropTable
DROP TABLE "PickupData";

-- DropTable
DROP TABLE "ReturnData";

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_pickupLocationId_key" ON "Reservation"("pickupLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_returnLocationId_key" ON "Reservation"("returnLocationId");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_pickupLocationId_fkey" FOREIGN KEY ("pickupLocationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_returnLocationId_fkey" FOREIGN KEY ("returnLocationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
