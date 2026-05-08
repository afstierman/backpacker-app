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
    lng: 104,
    cost: {
      accommodation: 15,
      food: 14,
      transport: 7,
      activities: 6,
      visa: 0,
      currency: "USD",
    },
    countries: [
      {
        slug: "thailand",
        name: "Thailand",
        lat: 15.87,
        lng: 100.99,
        cost: {
          accommodation: 14,
          food: 14,
          transport: 6,
          activities: 6,
          visa: 0,
          currency: "THB",
        },
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
        cost: {
          accommodation: 11,
          food: 13,
          transport: 5,
          activities: 5,
          visa: 25,
          currency: "VND",
        },
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
        lng: 118,
        cost: {
          accommodation: 13,
          food: 13,
          transport: 6,
          activities: 5,
          visa: 0,
          currency: "IDR",
        },
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
    lat: 50,
    lng: 20,
    cost: {
      accommodation: 24,
      food: 20,
      transport: 10,
      activities: 13,
      visa: 0,
      currency: "USD",
    },
    countries: [
      {
        slug: "czech-republic",
        name: "Czech Republic",
        lat: 49.82,
        lng: 15.47,
        cost: {
          accommodation: 24,
          food: 19,
          transport: 9,
          activities: 13,
          visa: 0,
          currency: "CZK",
        },
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
        cost: {
          accommodation: 21,
          food: 18,
          transport: 9,
          activities: 12,
          visa: 0,
          currency: "HUF",
        },
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
        cost: {
          accommodation: 13,
          food: 11,
          transport: 5,
          activities: 5,
          visa: 0,
          currency: "GEL",
        },
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
    lat: 48,
    lng: 5,
    cost: {
      accommodation: 32,
      food: 26,
      transport: 10,
      activities: 21,
      visa: 0,
      currency: "USD",
    },
    countries: [
      {
        slug: "portugal",
        name: "Portugal",
        lat: 39.4,
        lng: -8.22,
        cost: {
          accommodation: 28,
          food: 24,
          transport: 9,
          activities: 18,
          visa: 0,
          currency: "EUR",
        },
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
    lat: 4,
    lng: -72,
    cost: {
      accommodation: 16,
      food: 15,
      transport: 7,
      activities: 8,
      visa: 0,
      currency: "USD",
    },
    countries: [
      {
        slug: "colombia",
        name: "Colombia",
        lat: 4.57,
        lng: -74.3,
        cost: {
          accommodation: 13,
          food: 13,
          transport: 6,
          activities: 6,
          visa: 0,
          currency: "COP",
        },
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
        cost: {
          accommodation: 17,
          food: 17,
          transport: 7,
          activities: 10,
          visa: 0,
          currency: "MXN",
        },
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
        minZoom: regionData.countries.length > 5 ? 4 : 6, // Looser clustering for regions with many countries
      },
    });
    console.log(`  Region: ${region.name}`);

    await prisma.costSnapshot.create({
      data: {
        regionId: region.id,
        accommodationUsdDay: regionData.cost.accommodation,
        foodUsdDay: regionData.cost.food,
        transportUsdDay: regionData.cost.transport,
        activitiesUsdDay: regionData.cost.activities,
        visaUsd: regionData.cost.visa,
        currencyLocal: regionData.cost.currency,
        source: "MANUAL",
      },
    });

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
          minZoom: countryData.cities.length > 5 ? 4 : 6, // Looser clustering for countries with many cities
        },
      });
      console.log(`    Country: ${country.name}`);

      await prisma.costSnapshot.create({
        data: {
          countryId: country.id,
          accommodationUsdDay: countryData.cost.accommodation,
          foodUsdDay: countryData.cost.food,
          transportUsdDay: countryData.cost.transport,
          activitiesUsdDay: countryData.cost.activities,
          visaUsd: countryData.cost.visa,
          currencyLocal: countryData.cost.currency,
          source: "MANUAL",
        },
      });

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
            minZoom: 10, // Default clustering for cities
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
