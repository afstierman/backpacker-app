import { prisma } from "../db/client";

export async function getRegionDestinations() {
  const regions = await prisma.region.findMany({
    include: {
      countries: {
        include: {
          cities: true,
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

  return regions
    .map((region) => {
      const snapshot = region.costSnapshots[0];

      if (!snapshot) {
        return null;
      }

      return {
        id: region.id,
        name: region.name,
        dailyCostUSD:
          snapshot.accommodationUsdDay +
          snapshot.foodUsdDay +
          snapshot.transportUsdDay +
          snapshot.activitiesUsdDay +
          (snapshot.visaUsd ?? 0),
        lat: region.lat,
        lng: region.lng,
        minZoom: region.minZoom,
      };
    })
    .filter(
      (destination): destination is NonNullable<typeof destination> =>
        destination !== null,
    );
}
