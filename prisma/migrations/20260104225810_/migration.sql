/*
  Warnings:

  - Added the required column `ownerId` to the `Apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Tenants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Apartments" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Tenants" ADD COLUMN     "ownerId" TEXT NOT NULL;
