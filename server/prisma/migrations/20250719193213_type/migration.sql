/*
  Warnings:

  - You are about to drop the column `type` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `locationType` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "type",
ADD COLUMN     "locationType" "LocationTypes" NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "type",
ADD COLUMN     "vehicleType" "VehicleType" NOT NULL DEFAULT 'Car';
