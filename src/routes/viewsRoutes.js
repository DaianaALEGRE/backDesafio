import { Router } from 'express';
import ProductManager from '../controller/productsManagerController.js';
import path from 'path';

const router = Router();

// Obtener la ruta absoluta del directorio actual
const currentDirectory = path.resolve();

// Construir la ruta completa al archivo product.JSON
const productFilePath = path.join(currentDirectory, 'src', 'models', 'product.JSON');

const manager = new ProductManager(productFilePath);

router.get('/realtime', (req, res) => {
  let allProducts = manager.getProducts();
  res.render('realTime', { title: 'este es el home', products: allProducts });
});

export default router;
