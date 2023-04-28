-- DropForeignKey
ALTER TABLE "Chatbot" DROP CONSTRAINT "Chatbot_promptTemplateId_fkey";

-- AlterTable
ALTER TABLE "Chatbot" ADD COLUMN     "datasourceId" INTEGER;

-- CreateTable
CREATE TABLE "Datasource" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Datasource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Datasource" ADD CONSTRAINT "Datasource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatbot" ADD CONSTRAINT "Chatbot_promptTemplateId_fkey" FOREIGN KEY ("promptTemplateId") REFERENCES "PromptTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatbot" ADD CONSTRAINT "Chatbot_datasourceId_fkey" FOREIGN KEY ("datasourceId") REFERENCES "Datasource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
