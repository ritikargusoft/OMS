import { double, int, serial, varchar } from "drizzle-orm/mysql-core";

export const products = mysqlTable("products",{
  id:serial("id").primaryKey(),
  name:varchar("name",{length:200}).notNull(),
  price:double("price").notNull(),
  stock:int("stock").notNull(),
});