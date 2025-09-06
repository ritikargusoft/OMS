import express from "express";
import { addProduct, viewLowStock } from "../controllers/adminController.js";

const router = express.Router();

router.post('/admin/products', async (req, res)=>{
    try {
        const product = await addProduct(req.body);
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/admin/products/low-stock', async(req,res)=>{
    try {
        const threshold = parseInt(req.query.threshold) || 5;
        const products = await viewLowStock(threshold);
        res.json(products);
    } catch (error) {
          res.status(400).json({ error: error.message });
    }
});

export const adminRoutes = router;