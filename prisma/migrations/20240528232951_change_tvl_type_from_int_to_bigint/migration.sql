/*
  Warnings:

  - You are about to alter the column `tvl` on the `Pool` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "blockchain" TEXT NOT NULL,
    "tvl" BIGINT,
    "url" TEXT,
    "apy" DECIMAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pool" ("apy", "blockchain", "createdAt", "id", "name", "protocol", "tvl", "updatedAt", "url") SELECT "apy", "blockchain", "createdAt", "id", "name", "protocol", "tvl", "updatedAt", "url" FROM "Pool";
DROP TABLE "Pool";
ALTER TABLE "new_Pool" RENAME TO "Pool";
CREATE UNIQUE INDEX "Pool_name_key" ON "Pool"("name");
PRAGMA foreign_key_check("Pool");
PRAGMA foreign_keys=ON;
