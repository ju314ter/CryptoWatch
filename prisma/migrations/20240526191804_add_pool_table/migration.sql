-- CreateTable
CREATE TABLE "Pool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "blockchain" TEXT NOT NULL,
    "tvl" INTEGER,
    "url" TEXT,
    "apy" DECIMAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
