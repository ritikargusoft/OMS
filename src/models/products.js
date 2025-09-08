import { double, int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const products = mysqlTable("products",{
  id:serial("id").primaryKey(),
  name:varchar("name",{length:200}).notNull(),
  price:double("price").notNull(),
  stock:int("stock").notNull(),
// },
// (table)=>{
//   return{
//     uniqueName: uniqueIndex("unique_product_name").on(table.name),
//   }
});