// Run with "pnpm exec prisma db seed"

import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const destinations = [
    {
      city: "Bangkok",
      country: "Thailand",
      dailyCostUSD: 45,
      lat: 13.7563,
      lng: 100.5018,
    },
    {
      city: "Lisbon",
      country: "Portugal",
      dailyCostUSD: 85,
      lat: 38.7169,
      lng: -9.1399,
    },
    {
      city: "Medellin",
      country: "Colombia",
      dailyCostUSD: 40,
      lat: 6.2442,
      lng: -75.5812,
    },
    {
      city: "Chiang Mai",
      country: "Thailand",
      dailyCostUSD: 35,
      lat: 18.7883,
      lng: 98.9853,
    },
    {
      city: "Tbilisi",
      country: "Georgia",
      dailyCostUSD: 38,
      lat: 41.7151,
      lng: 44.8271,
    },
    {
      city: "Mexico City",
      country: "Mexico",
      dailyCostUSD: 55,
      lat: 19.4326,
      lng: -99.1332,
    },
    {
      city: "Bali",
      country: "Indonesia",
      dailyCostUSD: 42,
      lat: -8.3405,
      lng: 115.092,
    },
    {
      city: "Prague",
      country: "Czech Republic",
      dailyCostUSD: 70,
      lat: 50.0755,
      lng: 14.4378,
    },
    {
      city: "Ho Chi Minh City",
      country: "Vietnam",
      dailyCostUSD: 38,
      lat: 10.8231,
      lng: 106.6297,
    },
    {
      city: "Budapest",
      country: "Hungary",
      dailyCostUSD: 65,
      lat: 47.4979,
      lng: 19.0402,
    },
  ];

  console.log("Starting seed...");
  let count = 0;

  for (const d of destinations) {
    try {
      await prisma.destination.upsert({
        where: { city: d.city },
        update: {},
        create: d,
      });
      console.log(`✓ Upserted: ${d.city}`);
      count++;
    } catch (err) {
      console.error(`✗ Failed to upsert ${d.city}:`, err);
      throw err;
    }
  }

  console.log(`Seeded ${count} destinations successfully`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
