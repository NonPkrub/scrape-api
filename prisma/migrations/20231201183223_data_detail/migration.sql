/*
  Warnings:

  - Added the required column `max_temp` to the `scrapeds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_temp` to the `scrapeds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wind` to the `scrapeds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scrapeds" ADD COLUMN     "max_temp" INTEGER NOT NULL,
ADD COLUMN     "min_temp" INTEGER NOT NULL,
ADD COLUMN     "wind" DOUBLE PRECISION NOT NULL;
