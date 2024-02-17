import ProductManager from './main.js';
import express from 'express';

const manager = new ProductManager('product.JSON'); // Crear una instancia de ProductManager




const app = express();

const PORT = 8080;

app.get('/products', (req, res) => {
  const array =  manager.getProducts();
  res.send(array);
});

app.get('/products/:pid', (req, res) => {
  const id = req.params.pid; 
try{
      const product = manager.getProductById(parseInt(id)); 
         res.send(product); }
       catch {  res.status(404).send("producto no encontrado señora");
        } 
    });

app.get('/products/limit/:limit', (req,res)=>{
  const limit= parseInt(req.params.limit);
  const array =  manager.getProducts().slice(0,limit);
   res.send(array);
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
