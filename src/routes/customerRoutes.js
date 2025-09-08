import { parse } from "dotenv";
import express from "express";
import { placeOrder, placeOrderSim, simulateConcurrent } from "../controllers/customerController.js";

const router = express.Router();


//single order
router.post("/customers/orders", placeOrderSim)

//simulate concurrent
router.post("/customer/orders/concurrent", simulateConcurrent)

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