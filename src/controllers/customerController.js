import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { orders } from "../models/orders.js";
import { products } from "../models/products.js";
import { InvalidProductException, OutOfStockException } from "../utils/errors.js";

// Customer places an order
export async function placeOrder(customerId, productId, quantity) {
  // check product
  const [product] = await db.select().from(products).where(eq(products.id, productId));

  if (!product) throw new InvalidProductException("Product does not exist");

  if (product.stock < quantity) throw new OutOfStockException("Not enough stock available");

  // reduce stock safely
  await db.update(products)
    .set({ stock: product.stock - quantity })
    .where(eq(products.id, productId));

  // create order
  const [order] = await db.insert(orders).values({
    customerId,
    productId,
    quantity,
  }).returning();

  return order;
}
