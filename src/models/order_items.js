import { int, mysqlTable, serial } from "drizzle-orm/mysql-core";
import { products } from "./products.js";
import { orders } from "./orders.js";

export const order_items = mysqlTable("order_items",{
    order_item_id: serial("id").primaryKey(),
    orderId: int("order_id"),
    productId: int("product_id"),
    quantity: int("quantity").notNull(),
});