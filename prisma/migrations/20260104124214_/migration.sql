/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apartmentId` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentType` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryDate` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberDocument` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDay` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryPhone` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."DocumentType" AS ENUM ('DNI', 'PASSPORT', 'CE');

-- CreateEnum
CREATE TYPE "public"."Nationality" AS ENUM ('PERU', 'CHILE', 'ARGENTINA', 'OTHER');

-- DropIndex
DROP INDEX "public"."Tenant_name_key";

-- AlterTable
ALTER TABLE "public"."Tenant" ADD COLUMN     "apartmentId" TEXT NOT NULL,
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "documentType" "public"."DocumentType" NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emergencyPhone" TEXT,
ADD COLUMN     "entryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "nationality" "public"."Nationality" NOT NULL,
ADD COLUMN     "numberDocument" TEXT NOT NULL,
ADD COLUMN     "outDate" TIMESTAMP(3),
ADD COLUMN     "paymentDay" INTEGER NOT NULL,
ADD COLUMN     "primaryPhone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_email_key" ON "public"."Tenant"("email");

-- AddForeignKey
ALTER TABLE "public"."Tenant" ADD CONSTRAINT "Tenant_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "public"."Apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
