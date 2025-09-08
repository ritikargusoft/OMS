import { db } from "../config/db.js";
import { eq, sql } from "drizzle-orm";
import { InvalidProductException, OutOfStockException } from "../utils/errors.js";
import { products } from "../models/products.js";
import { orders } from "../models/orders.js";


export async function placeOrderAtomic({ customerId, productId, quantity }) {
  return db.transaction(async (tx) => {
        //ensure product exists 
    const [prod] = await tx.select().from(products).where(eq(products.id, productId));
    if (!prod) throw new InvalidProductException("Product does not exist");
   
      //prevent race condition update set stock 
    const updateResult = await tx.execute(
      sql`UPDATE ${products}
          SET ${products.stock} = ${products.stock} - ${quantity}
          WHERE ${products.id} = ${productId} AND ${products.stock} >= ${quantity}`
    );
    
    // drizzle/mysql2 returns result with affectedRows
    const affected =
      updateResult?.[0]?.affectedRows ??
      updateResult?.affectedRows ??
      0;
    if (affected === 0) throw new OutOfStockException("Not enough stock available");

    // 3) create order row 
    const insertRes = await tx.insert(orders).values({
      customerId,
      productId,
      quantity,
    });
    const orderId =
      insertRes?.[0]?.insertId ??
      insertRes?.insertId ??
      null;
    return { orderId, customerId, productId, quantity };
  });
}
//simulationg concurrent orders - fire multiple async calls at once
export async function simulateConcurrentOrders(productId, orderRequests) {
  const tasks = orderRequests.map((r) =>
    placeOrderAtomic({ productId, customerId: r.customerId, quantity: r.quantity })
  );
//check which one fail due to lack of stock
  return Promise.allSettled(tasks);
}






