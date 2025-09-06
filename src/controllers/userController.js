import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { users } from "../models/users.js";


export async function displayProfile(userId) {
    const[user] = await db.select().from(users).where(eq(users.id, userId));
    if(!user){
        throw new Error("User not found");
    }
    return user;
}

export async function createUser({name,email,role}) {
    const [user] = await db.insert(users).values({name,email,role}).$returningId();
    return user;
}