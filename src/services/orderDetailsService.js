import fs from "fs";
import { orders } from "../models/orders.js";
import { db } from "../config/db.js";
import { products } from "../models/products.js";
import { eq } from "drizzle-orm";
import { users } from "../models/users.js";
import { order_items } from "../models/order_items.js";
import path from "path";


const storagePath = path.join(process.cwd(), "src", "storage", "allOrders.json");

async function writeAllOrdersToFile() {
  const allOrders = await getAllOrderSummaries();
  fs.writeFileSync(storagePath, JSON.stringify(allOrders, null, 2));
}
// export async function placeOrder(customerId, items) {
//   const [newOrder] = await db.insert(orders).values({ customerId }).returning();
//   let total = 0;
//   for (const item of items) {
//     const [product] = await db
//       .select()
//       .from(products)
//       .where(eq(products.id, item.productId));
//     if (!product || product.stock < item.quantity) {
//       throw new Error("Invalid or out-of-stock product");
//     }
//     await db
//       .update(products)
//       .set({ stock: product.stock - item.quantity })
//       .where(eq(products.id, item.productId));
//     // add order item
//     await db.insert(order_items).values({
//       orderId: newOrder.id,
//       productId: item.productId,
//       quantity: item.quantity,
//     });
//     total += product.price * item.quantity;
//   }
//   // build order summary
//   const summary = await getOrderSummary(newOrder.id);
//   // update allOrders.json
//   await writeAllOrdersToFile();
//   return summary;
// }


export async function getOrderSummary(orderId) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId));
  if (!order) return null;
  const [customer] = await db
    .select()
    .from(users)
    .where(eq(users.id, order.customerId));
  const items = await db
    .select({
      product: products.name,
      price: products.price,
      quantity: order_items.quantity,
    })
    .from(order_items)
    .innerJoin(products, eq(order_items.productId, products.id))
    .where(eq(order_items.orderId, order.id));

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return {
    orderId: order.id,
    customer: customer?.name,
    total,
    items,
  };
}

// all orders summary
export async function getAllOrderSummaries() {
  const all = await db.select().from(orders);
  const summaries = [];
  for (const order of all) {
    const summary = await getOrderSummary(order.id);
    summaries.push(summary);
  }
  return summaries;
}