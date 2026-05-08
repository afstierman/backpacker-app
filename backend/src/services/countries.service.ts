import { prisma } from "../db/client";

export async function getCountryDestinations() {
  const countries = await prisma.country.findMany({
    include: {
      region: true,
      cities: true,
      costSnapshots: {
        orderBy: {
          snapshottedAt: "desc",
        },
        take: 1,
      },
    },
  });

  return countries
    .map((country) => {
      const snapshot = country.costSnapshots[0];

      if (!snapshot) {
        return null;
      }

      return {
        id: country.id,
        name: country.name,
        region: country.region.name,
        dailyCostUSD:
          snapshot.accommodationUsdDay +
          snapshot.foodUsdDay +
          snapshot.transportUsdDay +
          snapshot.activitiesUsdDay +
          (snapshot.visaUsd ?? 0),
        lat: country.lat,
        lng: country.lng,
        minZoom: country.minZoom,
      };
    })
    .filter(
      (destination): destination is NonNullable<typeof destination> =>
        destination !== null,
    );
}
