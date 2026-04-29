import { prisma } from "../../db/client";

export const destinationResolvers = {
  Query: {
    destinations: () => prisma.destination.findMany(),
  },
};
