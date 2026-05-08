import { getCountryDestinations } from "../../services/countries.service";

export const countryResolvers = {
  Query: {
    countries: async () => {
      return getCountryDestinations();
    },
  },
};
