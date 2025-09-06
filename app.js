import express from "express";
import { userRoutes } from "./src/routes/userRoutes.js";

const app = express();
app.use(express.json())

// app.use("/api", userRoutes);
app.use(userRoutes)
app.listen(3000, ()=>{
    console.log("Server running on 3000")
})