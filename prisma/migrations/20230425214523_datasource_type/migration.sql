/*
  Warnings:

  - Added the required column `type` to the `Datasource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Datasource" ADD COLUMN     "type" TEXT NOT NULL;
