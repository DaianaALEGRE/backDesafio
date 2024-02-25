import { Router } from 'express';
import ProductManager from '../controller/productManagerController.js';
const productsRouter = Router();
const products =[] 

const manager = new ProductManager('product.JSON');
productsRouter.post("/",(req,res)=>{
    const productos = req.body;
    productos.push(item);
    console.log(products);
    res.send({status:"succes", Message: "producto creado"});
    })
    productsRouter.get('/products/:pid', (req, res) => {
      const id = req.params.pid;
      try {
        const product = manager.getProductById(parseInt(id));
        res.send(product);
      }
      catch {
        res.status(404).send("producto no encontrado señora");
      }
    });
    
    productsRouter.get('/products', (req, res) => {
      let limit = parseInt(req.query.limit);
     const products = manager.getProducts();
     if (isNaN(limit) || limit <= 0) {
       return res.send(products) ;
     }
    res.send(products.slice(0, limit));
    });
    




    export default productsRouter;