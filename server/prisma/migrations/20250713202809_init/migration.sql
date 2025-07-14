/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('Van', 'Car', 'Truck', 'SUV');

-- DropTable
DROP TABLE "Contact";

-- CreateTable
CREATE TABLE "Options" (
    "id" SERIAL NOT NULL,
    "CruiseControl" BOOLEAN NOT NULL DEFAULT false,
    "AirConditioner" BOOLEAN NOT NULL DEFAULT true,
    "RWD" BOOLEAN NOT NULL DEFAULT false,
    "BlueTooth" BOOLEAN NOT NULL DEFAULT true,
    "Sunroof" BOOLEAN NOT NULL DEFAULT false,
    "LeatherSeats" BOOLEAN NOT NULL DEFAULT false,
    "GasolineVehicle" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "type" "VehicleType" NOT NULL DEFAULT 'Car',
    "automaticTransmission" BOOLEAN NOT NULL DEFAULT true,
    "pricePerDay" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "maxPassengers" INTEGER NOT NULL,
    "numberOfDoors" INTEGER NOT NULL,
    "luggageCapacity" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "optionsId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "licenceNumber" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "receiveEmails" BOOLEAN NOT NULL DEFAULT true,
    "refreshToken" TEXT NOT NULL,
    "reservationId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "returnData" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "reservationId" INTEGER NOT NULL,

    CONSTRAINT "returnData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickupData" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "reservationId" INTEGER NOT NULL,

    CONSTRAINT "PickupData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_model_key" ON "Vehicle"("model");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_reservationId_key" ON "Vehicle"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_optionsId_key" ON "Vehicle"("optionsId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_reservationId_key" ON "User"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "returnData_type_key" ON "returnData"("type");

-- CreateIndex
CREATE UNIQUE INDEX "returnData_reservationId_key" ON "returnData"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "PickupData_type_key" ON "PickupData"("type");

-- CreateIndex
CREATE UNIQUE INDEX "PickupData_reservationId_key" ON "PickupData"("reservationId");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_optionsId_fkey" FOREIGN KEY ("optionsId") REFERENCES "Options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "returnData" ADD CONSTRAINT "returnData_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickupData" ADD CONSTRAINT "PickupData_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
