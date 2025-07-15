/*
  Warnings:

  - You are about to drop the column `reservationId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_reservationId_fkey";

-- DropIndex
DROP INDEX "Reservation_pickupLocationId_key";

-- DropIndex
DROP INDEX "Reservation_returnLocationId_key";

-- DropIndex
DROP INDEX "User_reservationId_key";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "reservationId";

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_userId_key" ON "Reservation"("userId");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
