import { getCityDestinations } from "../../services/cities.service";

export const cityResolvers = {
  Query: {
    cities: async () => {
      return getCityDestinations();
    },
  },
};
