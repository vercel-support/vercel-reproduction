-- CreateTable
CREATE TABLE "search" (
    "term" TEXT NOT NULL,

    PRIMARY KEY ("term")
);

-- CreateTable
CREATE TABLE "SearchProfiles" (
    "order" INTEGER NOT NULL,
    "term" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    PRIMARY KEY ("term","username")
);

-- CreateTable
CREATE TABLE "SearchHashtags" (
    "order" INTEGER NOT NULL,
    "term" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("term","name")
);

-- CreateTable
CREATE TABLE "SearchLocations" (
    "order" INTEGER NOT NULL,
    "term" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("term","name")
);

-- AddForeignKey
ALTER TABLE "SearchProfiles" ADD FOREIGN KEY ("term") REFERENCES "search"("term") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchProfiles" ADD FOREIGN KEY ("username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchHashtags" ADD FOREIGN KEY ("term") REFERENCES "search"("term") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchHashtags" ADD FOREIGN KEY ("name") REFERENCES "hashtag"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchLocations" ADD FOREIGN KEY ("term") REFERENCES "search"("term") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchLocations" ADD FOREIGN KEY ("name") REFERENCES "location"("name") ON DELETE CASCADE ON UPDATE CASCADE;
