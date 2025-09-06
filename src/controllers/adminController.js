import { eq, lt } from "drizzle-orm";
import { products } from "../models/products.js";
import { db } from "../config/db.js";
import { validProductInput } from "../utils/validate.js";


//add a product
export async function addProduct({name, price, stock}) {
    validProductInput({name,price,stock})

    //checking for duplicate name
    const existing = await db.select().from(products).where(eq(products.name, name))
    if(existing.length >0){
        throw new Error("Product of this name already exists");
    }

    const[product] = await db.insert(products).values({name, price, stock,}).returning();
    return product;
}

//view low stock products
export async function viewLowStock(threshold = 3) {
    return await db.select().from(products).where(lt(products.stock, threshold));   
}