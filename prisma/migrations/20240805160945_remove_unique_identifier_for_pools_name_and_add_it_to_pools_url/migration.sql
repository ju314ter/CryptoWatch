/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Pool` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pool_url_key" ON "Pool"("url");
