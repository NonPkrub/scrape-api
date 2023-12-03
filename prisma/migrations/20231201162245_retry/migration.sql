/*
  Warnings:

  - Added the required column `configId` to the `scrapeds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `districtId` to the `scrapeds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "districts" ADD COLUMN     "configId" INTEGER;

-- AlterTable
ALTER TABLE "scrapeds" ADD COLUMN     "configId" INTEGER NOT NULL,
ADD COLUMN     "districtId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_configId_fkey" FOREIGN KEY ("configId") REFERENCES "configs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scrapeds" ADD CONSTRAINT "scrapeds_configId_fkey" FOREIGN KEY ("configId") REFERENCES "configs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scrapeds" ADD CONSTRAINT "scrapeds_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
