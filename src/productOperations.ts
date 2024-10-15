import { db } from "./db";
import { products } from "./schema";
import { eq } from "drizzle-orm";

export const productOperations = {
  create: async (name: string, description: string, price: number, categoryId: number) => {
    return await db.insert(products).values({ name, description, price, categoryId }).returning();
  },

  read: async (id: number) => {
    return await db.select().from(products).where(eq(products.id, id));
  },

  update: async (id: number, name: string, description: string, price: number, categoryId: number) => {
    return await db.update(products)
      .set({ name, description, price, categoryId })
      .where(eq(products.id, id))
      .returning();
  },

  delete: async (id: number) => {
    return await db.delete(products).where(eq(products.id, id)).returning();
  },

  list: async () => {
    return await db.select().from(products);
  },
};