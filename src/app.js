import express from 'express';
import productsRouter from './routes/productsRoutes.js';
import ProductManager from './controller/productsManagerController.js'; // Asegúrate de usar la ruta correcta

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear una instancia de ProductManager
const manager = new ProductManager('product.JSON');

// Montar el enrutador de productos
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
