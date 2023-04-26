/*
  Warnings:

  - You are about to drop the column `metalIndexId` on the `Datasource` table. All the data in the column will be lost.
  - Added the required column `metadata` to the `Datasource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Datasource" DROP COLUMN "metalIndexId",
ADD COLUMN     "metadata" JSONB NOT NULL;
