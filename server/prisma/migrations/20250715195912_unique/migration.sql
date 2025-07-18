/*
  Warnings:

  - A unique constraint covering the columns `[country,city,address]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_country_city_address_key" ON "Location"("country", "city", "address");
