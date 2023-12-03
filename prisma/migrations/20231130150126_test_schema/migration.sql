/*
  Warnings:

  - You are about to drop the column `data` on the `configs` table. All the data in the column will be lost.
  - You are about to drop the `selectors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `selector` to the `configs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "configs" DROP CONSTRAINT "configs_data_fkey";

-- AlterTable
ALTER TABLE "configs" DROP COLUMN "data",
ADD COLUMN     "selector" TEXT NOT NULL;

-- DropTable
DROP TABLE "selectors";
