/*
  Warnings:

  - Added the required column `updated_at` to the `districts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "districts" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMPTZ(6),
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL;
