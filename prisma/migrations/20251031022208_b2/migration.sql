/*
  Warnings:

  - Changed the type of `floor` on the `Apartments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `area` on the `Apartments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Apartments" DROP COLUMN "floor",
ADD COLUMN     "floor" INTEGER NOT NULL,
DROP COLUMN "area",
ADD COLUMN     "area" DOUBLE PRECISION NOT NULL;
