/*
  Warnings:

  - Added the required column `lat` to the `districts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `districts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "districts" ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "long" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "scrapeds" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "day" TIMESTAMP(3) NOT NULL,
    "level" TEXT NOT NULL,
    "AQI" INTEGER NOT NULL,
    "weather" TEXT NOT NULL,

    CONSTRAINT "scrapeds_pkey" PRIMARY KEY ("id")
);
