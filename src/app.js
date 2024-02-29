// app.js
import express from 'express';
import productsRouter from'./routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js'; 

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/products', productsRouter);
app.use("/api/carts", cartRoutes); // Utiliza el enrutador de carritos como una constante
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
