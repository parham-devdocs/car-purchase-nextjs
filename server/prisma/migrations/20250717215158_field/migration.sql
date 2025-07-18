/*
  Warnings:

  - Added the required column `continent` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "continent" TEXT NOT NULL;
