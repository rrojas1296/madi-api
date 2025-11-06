/*
  Warnings:

  - The values [GOOD,REMODELATED] on the enum `ApartmentCondition` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `code` on the `Apartments` table. All the data in the column will be lost.
  - Added the required column `internalCode` to the `Apartments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ApartmentCondition_new" AS ENUM ('NEW', 'REMODELED', 'MAINTENANCE');
ALTER TABLE "public"."Apartments" ALTER COLUMN "condition" TYPE "public"."ApartmentCondition_new" USING ("condition"::text::"public"."ApartmentCondition_new");
ALTER TYPE "public"."ApartmentCondition" RENAME TO "ApartmentCondition_old";
ALTER TYPE "public"."ApartmentCondition_new" RENAME TO "ApartmentCondition";
DROP TYPE "public"."ApartmentCondition_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Apartments" DROP COLUMN "code",
ADD COLUMN     "internalCode" TEXT NOT NULL;
