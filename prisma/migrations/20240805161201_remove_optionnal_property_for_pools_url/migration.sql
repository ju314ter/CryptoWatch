/*
  Warnings:

  - Made the column `url` on table `Pool` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "blockchain" TEXT NOT NULL,
    "tvl" BIGINT,
    "url" TEXT NOT NULL,
    "apy" DECIMAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pool" ("apy", "blockchain", "createdAt", "id", "name", "protocol", "tvl", "updatedAt", "url") SELECT "apy", "blockchain", "createdAt", "id", "name", "protocol", "tvl", "updatedAt", "url" FROM "Pool";
DROP TABLE "Pool";
ALTER TABLE "new_Pool" RENAME TO "Pool";
CREATE UNIQUE INDEX "Pool_name_key" ON "Pool"("name");
CREATE UNIQUE INDEX "Pool_url_key" ON "Pool"("url");
PRAGMA foreign_key_check("Pool");
PRAGMA foreign_keys=ON;
