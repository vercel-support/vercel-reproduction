/*
  Warnings:

  - You are about to drop the column `profileId` on the `image` table. All the data in the column will be lost.
  - The primary key for the `location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_ImageToLocation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `location` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ImageToLocation" DROP CONSTRAINT "_ImageToLocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToLocation" DROP CONSTRAINT "_ImageToLocation_B_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_profileId_fkey";

-- DropIndex
DROP INDEX "location.slug_unique";

-- AlterTable
ALTER TABLE "image" DROP COLUMN "profileId",
ADD COLUMN     "locationId" TEXT,
ADD COLUMN     "profileUsername" TEXT;

-- AlterTable
ALTER TABLE "location" DROP CONSTRAINT "location_pkey",
ADD PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "is_private" DROP DEFAULT,
ALTER COLUMN "is_verified" DROP DEFAULT,
ALTER COLUMN "full_name" DROP DEFAULT,
ALTER COLUMN "biography" DROP DEFAULT,
ALTER COLUMN "profile_pic_url" DROP DEFAULT,
ALTER COLUMN "post_amount" DROP DEFAULT,
ALTER COLUMN "follower" DROP DEFAULT,
ALTER COLUMN "following" DROP DEFAULT;

-- DropTable
DROP TABLE "_ImageToLocation";

-- CreateTable
CREATE TABLE "ImageLocations" (
    "imageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("imageId","name")
);

-- CreateIndex
CREATE UNIQUE INDEX "location.id_unique" ON "location"("id");

-- AddForeignKey
ALTER TABLE "image" ADD FOREIGN KEY ("profileUsername") REFERENCES "profile"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageLocations" ADD FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageLocations" ADD FOREIGN KEY ("name") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
