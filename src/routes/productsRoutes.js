import { Router } from 'express';
import productsModels from '../models/products.models.js';
const productsRouter = Router();



productsRouter.post("/", (req, res) => {
    const products = req.body;
    manager.addProduct(products.title, products.description, products.price, products.img, products.code, products.stock ,products.category,products.status);
    
    res.send({ status: "success", Message: "producto creado" });
});



productsRouter.get("/", async (req, res) => {
    try {
        const products = await productsModels.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "error en el servidor" });
    }
});
//4) Actualizar por ID
productsRouter.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const productoActualizado = req.body;

    try {
        await manager.updateProduct((id), productoActualizado);
        res.json({
            message: "Producto actualizado exitosamente"
        });
    } catch (error) {
        console.error("Error al actualizar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

//5) Eliminar producto: 

productsRouter.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await manager.deleteProduct((id));
        res.json({
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});


export default productsRouter;