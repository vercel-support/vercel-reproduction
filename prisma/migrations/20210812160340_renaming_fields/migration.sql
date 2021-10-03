-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT,
    "username" TEXT NOT NULL,
    "is_private" BOOLEAN DEFAULT false,
    "is_verified" BOOLEAN DEFAULT false,
    "full_name" TEXT DEFAULT E'',
    "biography" TEXT DEFAULT E'',
    "profile_pic_url" TEXT DEFAULT E'',
    "post_amount" INTEGER DEFAULT 0,
    "follower" INTEGER DEFAULT 0,
    "following" INTEGER DEFAULT 0,

    PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "post_amount" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hashtag" (
    "id" TEXT,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,
    "post_count" INTEGER,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "shortcode" TEXT NOT NULL,
    "liked" INTEGER NOT NULL,
    "comment_count" INTEGER NOT NULL,
    "engagement_rate" DOUBLE PRECISION NOT NULL,
    "day" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "caption" TEXT,
    "profileId" TEXT,
    "hashtagName" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageHashtags" (
    "imageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    PRIMARY KEY ("imageId","name")
);

-- CreateTable
CREATE TABLE "ImageTags" (
    "imageId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    PRIMARY KEY ("imageId","username")
);

-- CreateTable
CREATE TABLE "_ImageToLocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "profile.id_unique" ON "profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "location.slug_unique" ON "location"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "hashtag.id_unique" ON "hashtag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "image.shortcode_unique" ON "image"("shortcode");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToLocation_AB_unique" ON "_ImageToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToLocation_B_index" ON "_ImageToLocation"("B");

-- AddForeignKey
ALTER TABLE "image" ADD FOREIGN KEY ("hashtagName") REFERENCES "hashtag"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageHashtags" ADD FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageHashtags" ADD FOREIGN KEY ("name") REFERENCES "hashtag"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageTags" ADD FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageTags" ADD FOREIGN KEY ("username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToLocation" ADD FOREIGN KEY ("A") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToLocation" ADD FOREIGN KEY ("B") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
