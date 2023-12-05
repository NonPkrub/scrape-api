/*
  Warnings:

  - Made the column `configId` on table `districts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "districts" DROP CONSTRAINT "districts_configId_fkey";

-- AlterTable
ALTER TABLE "districts" ALTER COLUMN "configId" SET NOT NULL;
