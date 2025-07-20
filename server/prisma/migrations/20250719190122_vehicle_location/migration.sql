/*
  Warnings:

  - A unique constraint covering the columns `[returnDate,pickupDate,pickupTime,returnTime]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "VehiclesLLocations" (
    "vehicleId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "VehiclesLLocations_pkey" PRIMARY KEY ("vehicleId","locationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_returnDate_pickupDate_pickupTime_returnTime_key" ON "Reservation"("returnDate", "pickupDate", "pickupTime", "returnTime");

-- AddForeignKey
ALTER TABLE "VehiclesLLocations" ADD CONSTRAINT "VehiclesLLocations_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehiclesLLocations" ADD CONSTRAINT "VehiclesLLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
