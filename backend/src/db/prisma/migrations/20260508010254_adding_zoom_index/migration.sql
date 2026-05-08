-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "minZoom" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "minZoom" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "regions" ADD COLUMN     "minZoom" INTEGER NOT NULL DEFAULT 10;
