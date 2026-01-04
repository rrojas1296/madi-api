/*
  Warnings:

  - You are about to drop the column `apartmentId` on the `Tenant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Tenant" DROP CONSTRAINT "Tenant_apartmentId_fkey";

-- AlterTable
ALTER TABLE "public"."Tenant" DROP COLUMN "apartmentId",
ADD COLUMN     "apartmentsId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Tenant" ADD CONSTRAINT "Tenant_apartmentsId_fkey" FOREIGN KEY ("apartmentsId") REFERENCES "public"."Apartments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
