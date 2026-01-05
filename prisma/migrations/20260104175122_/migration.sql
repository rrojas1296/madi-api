/*
  Warnings:

  - You are about to drop the column `apartmentsId` on the `Tenants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Tenants" DROP CONSTRAINT "Tenants_apartmentsId_fkey";

-- AlterTable
ALTER TABLE "public"."Tenants" DROP COLUMN "apartmentsId",
ADD COLUMN     "apartmentId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Tenants" ADD CONSTRAINT "Tenants_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "public"."Apartments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
