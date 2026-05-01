import { prisma } from "../../db/client";

export const destinationResolvers = {
  Query: {
    destinations: async () => {
      return getCityDestinations();
    },
    cities: async () => {
      return getCityDestinations();
    },
  },
};

// Will thin out, move logic to service layer

async function getCityDestinations() {
  const cities = await prisma.city.findMany({
    include: {
      country: {
        include: {
          region: true,
        },
      },
      costSnapshots: {
        orderBy: {
          snapshottedAt: "desc",
        },
        take: 1,
      },
    },
  });

  return cities
    .map((city) => {
      const snapshot = city.costSnapshots[0];

      if (!snapshot) {
        return null;
      }

      return {
        id: city.id,
        name: city.name,
        city: city.name,
        country: city.country.name,
        region: city.country.region.name,
        dailyCostUSD:
          snapshot.accommodationUsdDay +
          snapshot.foodUsdDay +
          snapshot.transportUsdDay +
          snapshot.activitiesUsdDay +
          (snapshot.visaUsd ?? 0),
        lat: city.lat,
        lng: city.lng,
      };
    })
    .filter(
      (destination): destination is NonNullable<typeof destination> =>
        destination !== null,
    );
}
