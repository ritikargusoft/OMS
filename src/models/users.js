import { mysqlEnum, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";


export const users = mysqlTable("users",{
    id: serial("id").primaryKey(),
    name: varchar("name",{length:100}).notNull(),
    email: varchar ("email",{length:150}).notNull().unique(),
    role: mysqlEnum("role", ["ADMIN", "CUSTOMER"]).notNull().default("CUSTOMER")
})