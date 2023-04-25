-- DropForeignKey
ALTER TABLE "Chatbot" DROP CONSTRAINT "Chatbot_promptTemplateId_fkey";

-- AlterTable
ALTER TABLE "Chatbot" ADD COLUMN     "datasourceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Chatbot" ADD CONSTRAINT "Chatbot_promptTemplateId_fkey" FOREIGN KEY ("promptTemplateId") REFERENCES "PromptTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatbot" ADD CONSTRAINT "Chatbot_datasourceId_fkey" FOREIGN KEY ("datasourceId") REFERENCES "Datasource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
