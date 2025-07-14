-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_optionsId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "reservationId" DROP NOT NULL,
ALTER COLUMN "optionsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_optionsId_fkey" FOREIGN KEY ("optionsId") REFERENCES "Options"("id") ON DELETE SET NULL ON UPDATE CASCADE;
