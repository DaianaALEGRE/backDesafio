import express from 'express';
const app = express();
const PORT = 8080;
import productsRouter from './routes/productsRoutes.js';

//midleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));





app.use("api/products",productsRouter)
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
