import ProductManager from './main.js';
import express from 'express';

const manager = new ProductManager('product.JSON'); 

const app = express();

const PORT = 8080;

app.get('/products/:pid', (req, res) => {
  const id = req.params.pid;
  try {
    const product = manager.getProductById(parseInt(id));
    res.send(product);
  }
  catch {
    res.status(404).send("producto no encontrado señora");
  }
});

app.get('/products', (req, res) => {
  let limit = parseInt(req.query.limit);
  const products = manager.getProducts();
  if (isNaN(limit) || limit <= 0) {
    return res.send(products) ;
  }
  res.send(products.slice(0, limit));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
