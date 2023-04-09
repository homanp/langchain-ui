/*
  Warnings:

  - You are about to drop the column `promtTemplateId` on the `Chatbot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chatbot" DROP CONSTRAINT "Chatbot_promtTemplateId_fkey";

-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "promtTemplateId",
ADD COLUMN     "promptTemplateId" INTEGER;

-- AddForeignKey
ALTER TABLE "Chatbot" ADD CONSTRAINT "Chatbot_promptTemplateId_fkey" FOREIGN KEY ("promptTemplateId") REFERENCES "PromptTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
