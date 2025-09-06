import { lt } from "drizzle-orm";
import { products } from "../models";


//add a product
export async function addProduct({name, price, stock}) {
    const[product] = await db.insert(products).values({name, price, stock}).returning();
    return product;
}

//view low stock products
export async function viewLowStock(threshold = 3) {
    return await db.select().from(products).where(lt(products.stock, threshold));   
}