/*
  Warnings:

  - Changed the type of `type` on the `Location` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LocationTypes" AS ENUM ('Hotel', 'AirPort');

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "type",
ADD COLUMN     "type" "LocationTypes" NOT NULL;
