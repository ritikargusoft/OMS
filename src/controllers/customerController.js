import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { orders } from "../models/orders.js";
import { products } from "../models/products.js";
import { InvalidProductException, OutOfStockException } from "../utils/errors.js";
import { validateOrderInput } from "../utils/validate.js";
import { placeOrderAtomic, simulateConcurrentOrders } from "../services/orderServices.js";

// Customer places an order
export async function placeOrder(customerId, productId, quantity) {
  validateOrderInput({productId,quantity})
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
  }).$returningId();

  return order;
}



export async function placeOrderSim(req, res) {
  try {
    const { customerId, productId, quantity } = req.body;
    const order = await placeOrderAtomic({ customerId, productId, quantity });
    res.json({ message: "Order placed", order });
  } catch (err) {
    res.status(err.statusCode || 400).json({ error: err.message });
  }
}
export async function simulateConcurrent(req, res) {
  try {
    const { productId, orders } = req.body; 
    const results = await simulateConcurrentOrders(productId, orders);
    const summary = results.map((r, i) =>
      r.status === "fulfilled"
        ? { index: i, success: true, order: r.value }
        : { index: i, success: false, error: r.reason?.message || "Failed" }
    );
    res.json({ message: "Concurrent simulation complete", summary });
  } catch (err) {
    res.status(500).json({ error: "Failed to simulate concurrent orders" });
  }
}