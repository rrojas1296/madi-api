/*
  Warnings:

  - You are about to alter the column `monthlyFee` on the `Apartments` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `garanty` on the `Apartments` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `maintenanceFee` on the `Apartments` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `area` on the `Apartments` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "public"."Apartments" ALTER COLUMN "monthlyFee" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "garanty" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "maintenanceFee" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "area" SET DATA TYPE DECIMAL(10,2);
