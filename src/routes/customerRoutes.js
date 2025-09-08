import express from "express";
import { placeOrder, placeOrderSim, simulateConcurrent } from "../controllers/customerController.js";
import { getAllOrderSummaries, getOrderSummary } from "../services/orderDetailsService.js";

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


//summary
router.get("/:id/summary",async(req,res)=>{
    const summary = await getOrderSummary(Number(req.params.id));
    if(!summary) return res.status(400).json({error:"Order not found"})
        res.json(summary)
})

//all summariees
router.get("/summary/all",async(req,res)=>{
    const summaries = await getAllOrderSummaries();
        if(!summaries) return res.status(400).json({error:"Order not found"})
        res.json(summaries)
})

export const customerRoutes = router;   