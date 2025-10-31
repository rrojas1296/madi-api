-- CreateEnum
CREATE TYPE "public"."ApartmentStatus" AS ENUM ('AVAILABLE', 'LEASED', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "public"."ApartmentCurrencies" AS ENUM ('PEN', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "public"."ApartmentCondition" AS ENUM ('GOOD', 'MAINTENANCE', 'REMODELATED');

-- CreateTable
CREATE TABLE "public"."Apartments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "status" "public"."ApartmentStatus" NOT NULL,
    "parking" TEXT,
    "persons" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "floors" INTEGER NOT NULL,
    "condition" "public"."ApartmentCondition" NOT NULL,
    "furnished" BOOLEAN NOT NULL DEFAULT false,
    "pets" BOOLEAN NOT NULL DEFAULT false,
    "monthlyFee" DOUBLE PRECISION NOT NULL,
    "garanty" DOUBLE PRECISION NOT NULL,
    "currency" "public"."ApartmentCurrencies" NOT NULL,
    "maintenanceFee" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Apartments_pkey" PRIMARY KEY ("id")
);
