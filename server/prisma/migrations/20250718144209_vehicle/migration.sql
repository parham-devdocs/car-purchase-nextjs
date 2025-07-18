/*
  Warnings:

  - A unique constraint covering the columns `[numberPlate]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_numberPlate_key" ON "Vehicle"("numberPlate");
