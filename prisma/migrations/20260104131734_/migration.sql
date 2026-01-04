/*
  Warnings:

  - You are about to drop the `Tenant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Tenant" DROP CONSTRAINT "Tenant_apartmentsId_fkey";

-- DropTable
DROP TABLE "public"."Tenant";

-- CreateTable
CREATE TABLE "public"."Tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "primaryPhone" TEXT NOT NULL,
    "emergencyPhone" TEXT,
    "email" TEXT NOT NULL,
    "documentType" "public"."DocumentType" NOT NULL,
    "numberDocument" TEXT NOT NULL,
    "nationality" "public"."Nationality" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "outDate" TIMESTAMP(3),
    "paymentDay" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "apartmentsId" TEXT,

    CONSTRAINT "Tenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenants_email_key" ON "public"."Tenants"("email");

-- AddForeignKey
ALTER TABLE "public"."Tenants" ADD CONSTRAINT "Tenants_apartmentsId_fkey" FOREIGN KEY ("apartmentsId") REFERENCES "public"."Apartments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
