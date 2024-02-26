import { Router } from 'express';
import ProductManager from '../controller/productsManagerController.js'; // Asegúrate de usar la ruta correcta

const productsRouter = Router();
const manager = new ProductManager('product.JSON');

productsRouter.post("/", (req, res) => {
    const productos = req.body;
    manager.addProduct(productos.title, productos.description, productos.price, productos.thumbnail, productos.code, productos.stock);
    console.log(manager.getProducts()); // Aquí puedes verificar si los productos se están agregando correctamente
    res.send({ status: "success", Message: "producto creado" });
});

productsRouter.get('/:pid', async(req, res) => {
    const id = req.params.pid;
    try {
        const product = manager.getProductById(parseInt(id));
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }
        res.send(product);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).send("Error interno del servidor");
    }
});
productsRouter.get('/', (req, res) => {
    let limit = parseInt(req.query.limit);
    const products = manager.getProducts();
    if (isNaN(limit) || limit <= 0) {
        return res.json(products);
    }
    res.send(products.slice(0, limit));
});

productsRouter.get('/', (req, res) => {
    const products = manager.getProducts();
    res.json(products);
});


export default productsRouter;