/*
  Warnings:

  - You are about to drop the column `name` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationName]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationName` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Location_name_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "locationName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Location_locationName_key" ON "Location"("locationName");
