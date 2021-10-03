/*
  Warnings:

  - You are about to drop the column `post_amount` on the `location` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImageLocations" DROP CONSTRAINT "ImageLocations_name_fkey";

-- AlterTable
ALTER TABLE "image" ALTER COLUMN "engagement_rate" DROP NOT NULL,
ALTER COLUMN "day" DROP NOT NULL,
ALTER COLUMN "hour" DROP NOT NULL;

-- AlterTable
ALTER TABLE "location" DROP COLUMN "post_amount",
ADD COLUMN     "post_count" INTEGER,
ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "slug" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ImageLocations" ADD FOREIGN KEY ("name") REFERENCES "location"("name") ON DELETE CASCADE ON UPDATE CASCADE;
