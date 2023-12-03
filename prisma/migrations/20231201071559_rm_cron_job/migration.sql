/*
  Warnings:

  - You are about to drop the column `cronjob` on the `configs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "configs" DROP COLUMN "cronjob";
