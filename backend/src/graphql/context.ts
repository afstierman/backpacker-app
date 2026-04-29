import { prisma } from "../db/client";

export interface Context {
  db: typeof prisma;
}

export const createContext = async (): Promise<Context> => ({
  db: prisma,
});
