/*
  Warnings:

  - You are about to drop the `VehiclesLLocations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VehiclesLLocations" DROP CONSTRAINT "VehiclesLLocations_locationId_fkey";

-- DropForeignKey
ALTER TABLE "VehiclesLLocations" DROP CONSTRAINT "VehiclesLLocations_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "locationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "VehiclesLLocations";

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_locationId_key" ON "Vehicle"("locationId");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
