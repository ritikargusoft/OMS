import express from "express";
import { userRoutes } from "./src/routes/userRoutes.js";
import { adminRoutes } from "./src/routes/adminRoutes.js";
import { customerRoutes } from "./src/routes/customerRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;

// app.use("/api", userRoutes);
app.use(userRoutes)
app.use(adminRoutes)
app.use(customerRoutes)


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
