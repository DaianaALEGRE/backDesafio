import express from 'express';
import productsRouter from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js'; 
import multer from 'multer';
import Handlebars from 'express-handlebars';
import ProductManager from './controller/productsManagerController.js';
import path from 'path';
import { Server } from 'socket.io';
import viewRoutes from './routes/viewsRoutes.js';
import __dirname from './utils.js';

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/img'); // La carpeta donde se guardarán los archivos subidos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Nombre del archivo guardado
  }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single('imagen'), (req, res) => {
  try {
    // Lógica para procesar la carga del archivo
    res.send("Imagen cargada correctamente!");
  } catch (error) {
    console.error("Error al procesar la carga de la imagen:", error);
    res.status(500).send("Error al procesar la carga de la imagen");
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Handlebars
app.engine('handlebars', Handlebars.engine());
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use('/', express.static(path.join(__dirname, 'public')));

socketServer.on('connection', socket => {
  console.log("Nuevo cliente conectado");

  socket.on('message',data=>{
     console.log(data)
  })
 
});

// Instanciar ProductManager con la ruta absoluta del archivo de productos
const productFilePath = path.resolve(__dirname, 'models', 'product.JSON');
const manager = new ProductManager(productFilePath);

app.use('/', viewRoutes);
app.use('/api/products', productsRouter);
app.use("/api/carts", cartRoutes);

app.get('/', (req, res) => {
  let allProducts = manager.getProducts();
  res.render('home', { title: 'cosita', products: allProducts });
});