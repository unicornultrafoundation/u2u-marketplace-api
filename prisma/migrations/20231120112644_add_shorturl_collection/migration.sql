/*
  Warnings:

  - A unique constraint covering the columns `[shortUrl]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortUrl` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "shortUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Collection_shortUrl_key" ON "Collection"("shortUrl");
