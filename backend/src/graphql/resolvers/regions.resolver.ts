import { getRegionDestinations } from "../../services/regions.service";

export const regionResolvers = {
  Query: {
    regions: async () => {
      return getRegionDestinations();
    },
  },
};
