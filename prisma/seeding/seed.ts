import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type DefiLlamaPool = {
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number | null;
  apyBase: number | null;
  apyReward: number | null;
  apy: number | null;
  rewardTokens: unknown | null;
  pool: string;
  apyPct1D: number | null;
  apyPct7D: number | null;
  apyPct30D: number | null;
  stablecoin: boolean;
  ilRisk: string;
  exposure: string;
  predictions: {
    predictedClass: string;
    predictedProbability: number;
    binnedConfidence: number;
  };
  poolMeta: unknown | null;
  mu: number | null;
  sigma: number | null;
  count: number | null;
  outlier: boolean | null;
  underlyingTokens: string[] | null;
  il7d: unknown | null;
  apyBase7d: number | null;
  apyMean30d: number | null;
  volumeUsd1d: number | null;
  volumeUsd7d: number | null;
  apyBaseInception: number | null;
};

const createOriginalPoolSeeding = async () => {
  console.time("seedingFromScratch");
  console.log("executing seeding from scratch");
  const { data: pools } = await fetch("https://yields.llama.fi/pools").then(
    (res) => res.json()
  );

  const poolsArray: DefiLlamaPool[] = Object.keys(pools).map(
    (key) => pools[key]
  );

  await prisma.$connect();
  await prisma.pool.deleteMany({});

  const poolsToCreate = poolsArray.map((defiPool) => {
    const {
      apy,
      chain: blockchain,
      project: protocol,
      symbol: name,
      tvlUsd: tvl,
      pool: poolId,
      apyPct1D,
      apyPct7D,
    } = defiPool;

    return {
      name: name ? name : poolId,
      protocol,
      blockchain,
      tvl,
      apy,
      url: `https://defillama.com/yields/pool/${poolId}`,
      apyPct1D,
      apyPct7D,
    } satisfies Prisma.PoolCreateManyInput;
  });

  await prisma.pool.createMany({
    data: poolsToCreate,
  });

  console.timeEnd("seedingFromScratch");
};

createOriginalPoolSeeding()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    console.timeEnd("seedingFromScratch");
    await prisma.$disconnect();
    process.exit(1);
  });

// TODO : create a comparing function to check exist or has changed and upsert or create coresponding data,
// this will be used as CRON job to keep db up to date with defillama API
