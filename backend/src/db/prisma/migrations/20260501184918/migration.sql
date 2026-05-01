/*
  Warnings:

  - You are about to drop the `Destination` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ClimateType" AS ENUM ('TROPICAL', 'ARID', 'TEMPERATE', 'CONTINENTAL', 'POLAR');

-- CreateEnum
CREATE TYPE "TagCategory" AS ENUM ('BUDGET', 'VIBE', 'ACTIVITY', 'CLIMATE');

-- CreateEnum
CREATE TYPE "SnapshotSource" AS ENUM ('NUMBEO', 'MANUAL', 'PRICE_SYNC');

-- DropTable
DROP TABLE "Destination";

-- CreateTable
CREATE TABLE "regions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "heroImageUrl" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "description" TEXT,
    "heroImageUrl" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "description" TEXT,
    "heroImageUrl" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_snapshots" (
    "id" TEXT NOT NULL,
    "cityId" TEXT,
    "countryId" TEXT,
    "accommodationUsdDay" INTEGER NOT NULL,
    "foodUsdDay" INTEGER NOT NULL,
    "transportUsdDay" INTEGER NOT NULL,
    "activitiesUsdDay" INTEGER NOT NULL,
    "visaUsd" INTEGER,
    "currencyLocal" TEXT NOT NULL,
    "source" "SnapshotSource" NOT NULL,
    "snapshottedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cost_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "category" "TagCategory" NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region_tags" (
    "regionId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "region_tags_pkey" PRIMARY KEY ("regionId","tagId")
);

-- CreateTable
CREATE TABLE "country_tags" (
    "countryId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "country_tags_pkey" PRIMARY KEY ("countryId","tagId")
);

-- CreateTable
CREATE TABLE "city_tags" (
    "cityId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "city_tags_pkey" PRIMARY KEY ("cityId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "regions_slug_key" ON "regions"("slug");

-- CreateIndex
CREATE INDEX "regions_slug_idx" ON "regions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "countries_slug_key" ON "countries"("slug");

-- CreateIndex
CREATE INDEX "countries_slug_idx" ON "countries"("slug");

-- CreateIndex
CREATE INDEX "countries_regionId_idx" ON "countries"("regionId");

-- CreateIndex
CREATE UNIQUE INDEX "cities_slug_key" ON "cities"("slug");

-- CreateIndex
CREATE INDEX "cities_slug_idx" ON "cities"("slug");

-- CreateIndex
CREATE INDEX "cities_countryId_idx" ON "cities"("countryId");

-- CreateIndex
CREATE INDEX "cost_snapshots_cityId_snapshottedAt_idx" ON "cost_snapshots"("cityId", "snapshottedAt" DESC);

-- CreateIndex
CREATE INDEX "cost_snapshots_countryId_snapshottedAt_idx" ON "cost_snapshots"("countryId", "snapshottedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "tags_category_idx" ON "tags"("category");

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_snapshots" ADD CONSTRAINT "cost_snapshots_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_snapshots" ADD CONSTRAINT "cost_snapshots_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "region_tags" ADD CONSTRAINT "region_tags_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "region_tags" ADD CONSTRAINT "region_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country_tags" ADD CONSTRAINT "country_tags_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country_tags" ADD CONSTRAINT "country_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city_tags" ADD CONSTRAINT "city_tags_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city_tags" ADD CONSTRAINT "city_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
