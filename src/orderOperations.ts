import { db } from "./db";
import { orders, orderItems } from "./schema";
import { eq } from "drizzle-orm";

export const orderOperations = {
  create: async (userId: number, items: { productId: number; quantity: number }[]) => {
    return await db.transaction(async (tx) => {
      const [order] = await tx.insert(orders).values({ userId }).returning();
      
      const orderItemsToInsert = items.map(item => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity
      }));

      await tx.insert(orderItems).values(orderItemsToInsert);

      return order;
    });
  },

  read: async (id: number) => {
    const order = await db.select().from(orders).where(eq(orders.id, id));
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
    return { ...order[0], items };
  },

  update: async (id: number, status: 'pending' | 'completed' | 'cancelled') => {
    return await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
  },

  delete: async (id: number) => {
    return await db.transaction(async (tx) => {
      await tx.delete(orderItems).where(eq(orderItems.orderId, id));
      return await tx.delete(orders).where(eq(orders.id, id)).returning();
    });
  },

  list: async () => {
    return await db.select().from(orders);
  },
};