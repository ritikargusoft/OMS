import express from "express"
import { createUser, displayProfile } from "../controllers/userController.js";

const router = express.Router();

//creating a user
router.post("/user", async (req,res) => {
    try {
        const user= await createUser(req.body);
        res.json(user)
    } catch (err) {
        res.status(400).json({error: err.message});
    }
})

//get user profile
router.get("/users/:id", async (req,res) => {
    try {
        const user = await displayProfile(Number(req.params.id));
        res.json(user);
    } catch (err) {
  res.status(400).json({error: err.message});      
    }
})

// export default router;
export const userRoutes = router;
