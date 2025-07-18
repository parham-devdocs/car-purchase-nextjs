/*
  Warnings:

  - The values [AirPort] on the enum `LocationTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LocationTypes_new" AS ENUM ('Hotel', 'Airport');
ALTER TABLE "Location" ALTER COLUMN "type" TYPE "LocationTypes_new" USING ("type"::text::"LocationTypes_new");
ALTER TYPE "LocationTypes" RENAME TO "LocationTypes_old";
ALTER TYPE "LocationTypes_new" RENAME TO "LocationTypes";
DROP TYPE "LocationTypes_old";
COMMIT;
