import { db } from "./db";
import { categories } from "./schema";
import { eq } from "drizzle-orm";

export const categoryOperations = {
  create: async (name: string) => {
    return await db.insert(categories).values({ name }).returning();
  },

  read: async (id: number) => {
    return await db.select().from(categories).where(eq(categories.id, id));
  },

  update: async (id: number, name: string) => {
    return await db.update(categories).set({ name }).where(eq(categories.id, id)).returning();
  },

  delete: async (id: number) => {
    return await db.delete(categories).where(eq(categories.id, id)).returning();
  },

  list: async () => {
    return await db.select().from(categories);
  },
};