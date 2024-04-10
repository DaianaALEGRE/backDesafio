import express from 'express';
const router = express.Router();
import CartManager from "../controller/cartController.js";
const cartManager = new CartManager("../models/cart.models.js");


router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.createCart();
        res.json(nuevoCarrito);
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);

    try {
        const carrito = await cartManager.getCartById(cartId);
        res.json(carrito.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});




router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const updateCart= await cartManager.addProductCart(cartId, productId, quantity);
        res.json(updateCart.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;