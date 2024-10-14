import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";

export const userOperations = {
  create: async (name: string, email: string) => {
    return await db.insert(users).values({ name, email }).returning();
  },

  read: async (id: number) => {
    return await db.select().from(users).where(eq(users.id, id));
  },

  update: async (id: number, name: string, email: string) => {
    return await db.update(users).set({ name, email }).where(eq(users.id, id)).returning();
  },

  delete: async (id: number) => {
    return await db.delete(users).where(eq(users.id, id)).returning();
  },

  list: async () => {
    return await db.select().from(users);
  },
};