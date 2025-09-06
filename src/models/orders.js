import { int, mysqlTable, serial, timestamp } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { products } from "./products";

export const orders = mysqlTable("orders",{
    id: serial("id").primaryKey(),
    customerId: int("customer_id").references(() => users.id),
    productId: int("product_id").references(()=> products.id),
    quantity: int("quantity").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});