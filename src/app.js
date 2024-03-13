import { fileURLToPath } from 'url';
import express from 'express';
import productsRouter from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js'; 
import multer from 'multer';
import exphbs from 'express-handlebars';
import ProductManager from './controller/productsManagerController.js';
import * as path from 'path';
import { Server } from 'socket.io';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;
const httpServer=app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
const socketServer =new Server(httpServer)

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
//app.use('/',express.static(__dirname + '/public'))
// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));


// Instanciar ProductManager con la ruta absoluta del archivo de productos
const productFilePath = path.resolve(__dirname, 'models', 'product.JSON');
const manager = new ProductManager(productFilePath);



app.use('/api/products', productsRouter);
app.use("/api/carts", cartRoutes);


