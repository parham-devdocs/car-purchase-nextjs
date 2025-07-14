-- DropIndex
DROP INDEX "returnData_type_key";

-- AlterTable
ALTER TABLE "returnData" ALTER COLUMN "type" SET DATA TYPE TEXT;
