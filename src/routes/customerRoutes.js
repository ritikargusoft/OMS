import { parse } from "dotenv";
import express from "express";
import { placeOrder } from "../controllers/customerController.js";

const router = express.Router();

router.post('/customers/:id/orders', async(req,res)=>{
    try {
        const customerId = parseInt(req.params.id);
        const { productId, quantity } = req.body;
        const order = await placeOrder(customerId,productId,quantity);
        res.json(order);

    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

export const customerRoutes = router;   