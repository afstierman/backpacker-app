// Run with: pnpm exec prisma db seed

import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/index.js";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ============================================================================
// Seed data — Region → Country → City → CostSnapshot
// Cost splits are approximate budget-tier estimates (hostel/street food/local
// transit). Total should roughly match the original dailyCostUSD values.
// ============================================================================

const regions = [
  {
    slug: "southeast-asia",
    name: "Southeast Asia",
    lat: 12.5,
    lng: 104.0,
    countries: [
      {
        slug: "thailand",
        name: "Thailand",
        lat: 15.87,
        lng: 100.99,
        cities: [
          {
            slug: "bangkok",
            name: "Bangkok",
            lat: 13.7563,
            lng: 100.5018,
            cost: {
              accommodation: 15,
              food: 15,
              transport: 8,
              activities: 7,
              visa: 0,
              currency: "THB",
            },
          },
          {
            slug: "chiang-mai",
            name: "Chiang Mai",
            lat: 18.7883,
            lng: 98.9853,
            cost: {
              accommodation: 12,
              food: 12,
              transport: 5,
              activities: 6,
              visa: 0,
              currency: "THB",
            },
          },
        ],
      },
      {
        slug: "vietnam",
        name: "Vietnam",
        lat: 14.06,
        lng: 108.28,
        cities: [
          {
            slug: "ho-chi-minh-city",
            name: "Ho Chi Minh City",
            lat: 10.8231,
            lng: 106.6297,
            cost: {
              accommodation: 12,
              food: 14,
              transport: 6,
              activities: 6,
              visa: 25,
              currency: "VND",
            },
          },
        ],
      },
      {
        slug: "indonesia",
        name: "Indonesia",
        lat: -2.55,
        lng: 118.0,
        cities: [
          {
            slug: "bali",
            name: "Bali",
            lat: -8.3405,
            lng: 115.092,
            cost: {
              accommodation: 15,
              food: 14,
              transport: 7,
              activities: 6,
              visa: 0,
              currency: "IDR",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "eastern-europe",
    name: "Eastern Europe",
    lat: 50.0,
    lng: 20.0,
    countries: [
      {
        slug: "czech-republic",
        name: "Czech Republic",
        lat: 49.82,
        lng: 15.47,
        cities: [
          {
            slug: "prague",
            name: "Prague",
            lat: 50.0755,
            lng: 14.4378,
            cost: {
              accommodation: 25,
              food: 20,
              transport: 10,
              activities: 15,
              visa: 0,
              currency: "CZK",
            },
          },
        ],
      },
      {
        slug: "hungary",
        name: "Hungary",
        lat: 47.16,
        lng: 19.5,
        cities: [
          {
            slug: "budapest",
            name: "Budapest",
            lat: 47.4979,
            lng: 19.0402,
            cost: {
              accommodation: 22,
              food: 20,
              transport: 10,
              activities: 13,
              visa: 0,
              currency: "HUF",
            },
          },
        ],
      },
      {
        slug: "georgia",
        name: "Georgia",
        lat: 42.32,
        lng: 43.36,
        cities: [
          {
            slug: "tbilisi",
            name: "Tbilisi",
            lat: 41.7151,
            lng: 44.8271,
            cost: {
              accommodation: 14,
              food: 12,
              transport: 6,
              activities: 6,
              visa: 0,
              currency: "GEL",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "western-europe",
    name: "Western Europe",
    lat: 48.0,
    lng: 5.0,
    countries: [
      {
        slug: "portugal",
        name: "Portugal",
        lat: 39.4,
        lng: -8.22,
        cities: [
          {
            slug: "lisbon",
            name: "Lisbon",
            lat: 38.7169,
            lng: -9.1399,
            cost: {
              accommodation: 30,
              food: 25,
              transport: 10,
              activities: 20,
              visa: 0,
              currency: "EUR",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "latin-america",
    name: "Latin America",
    lat: 4.0,
    lng: -72.0,
    countries: [
      {
        slug: "colombia",
        name: "Colombia",
        lat: 4.57,
        lng: -74.3,
        cities: [
          {
            slug: "medellin",
            name: "Medellín",
            lat: 6.2442,
            lng: -75.5812,
            cost: {
              accommodation: 14,
              food: 14,
              transport: 6,
              activities: 6,
              visa: 0,
              currency: "COP",
            },
          },
        ],
      },
      {
        slug: "mexico",
        name: "Mexico",
        lat: 23.63,
        lng: -102.55,
        cities: [
          {
            slug: "mexico-city",
            name: "Mexico City",
            lat: 19.4326,
            lng: -99.1332,
            cost: {
              accommodation: 18,
              food: 18,
              transport: 8,
              activities: 11,
              visa: 0,
              currency: "MXN",
            },
          },
        ],
      },
    ],
  },
];

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log("Starting seed...");
  let cityCount = 0;

  for (const regionData of regions) {
    const region = await prisma.region.upsert({
      where: { slug: regionData.slug },
      update: {},
      create: {
        name: regionData.name,
        slug: regionData.slug,
        lat: regionData.lat,
        lng: regionData.lng,
      },
    });
    console.log(`  Region: ${region.name}`);

    for (const countryData of regionData.countries) {
      const country = await prisma.country.upsert({
        where: { slug: countryData.slug },
        update: {},
        create: {
          name: countryData.name,
          slug: countryData.slug,
          regionId: region.id,
          lat: countryData.lat,
          lng: countryData.lng,
        },
      });
      console.log(`    Country: ${country.name}`);

      for (const cityData of countryData.cities) {
        const city = await prisma.city.upsert({
          where: { slug: cityData.slug },
          update: {},
          create: {
            name: cityData.name,
            slug: cityData.slug,
            countryId: country.id,
            lat: cityData.lat,
            lng: cityData.lng,
          },
        });

        // Always insert a fresh snapshot — never upsert cost data
        await prisma.costSnapshot.create({
          data: {
            cityId: city.id,
            accommodationUsdDay: cityData.cost.accommodation,
            foodUsdDay: cityData.cost.food,
            transportUsdDay: cityData.cost.transport,
            activitiesUsdDay: cityData.cost.activities,
            visaUsd: cityData.cost.visa,
            currencyLocal: cityData.cost.currency,
            source: "MANUAL",
          },
        });

        console.log(`      City: ${city.name} ✓`);
        cityCount++;
      }
    }
  }

  console.log(
    `\nSeeded ${cityCount} cities across ${regions.length} regions successfully.`,
  );
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
