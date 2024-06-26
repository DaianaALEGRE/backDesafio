import { Router } from 'express';
const router = Router();
import ProductManager from '../controller/productsManagerController.js';
import CartManager from '../controller/cartController.js';


const cartManager = new CartManager();
const productManager = new ProductManager();

router.get("/products", async (req, res) => {
  try {
     const { page = 1, limit = 10} = req.query;
     const productos = await productManager.getProducts({
        page: parseInt(page),
        limit: parseInt(limit)
     });
     const productosFormateados= productos.docs.map(producto => ({
      title: producto.title,
      description: producto.description,
      price: producto.price,
      category: producto.category,
      // tengo q ver q otras propiedades agregar
    }));
    
    res.render("products", { productos: productosFormateados ,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
        currentPage: productos.page,
        totalPages: productos.totalPages
     });

  } catch (error) {
     console.error("Error al obtener productos", error);
     res.status(500).json({
        status: 'error',
        error: "Error interno del servidor"
     });
  }
});
router.get("/verProductos", async (req, res) => {
  try {
    const gatitos = await productManager.getProducts();
    console.log(gatitos);
    res.send("Revisa la consola para ver el resultado");
  } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).json({
      status: 'error',
      error: "Error interno del servidor"
    });
  }
});
//router.get("/carts/:cid", async (req, res) => {
 // const cartId = req.params.cid;

  //try {
    // const carrito = await cartManager.getCartById(cartId);

    // if (!carrito) {
      //  console.log("No existe ese carrito con el id");
        //return res.status(404).json({ error: "Carrito no encontrado" });
     //}

     //const productosEnCarrito = carrito.products.map(item => ({
       // product: item.product.toObject(),
        //Lo convertimos a objeto para pasar las restricciones de Exp Handlebars. 
        //quantity: item.quantity
     //}));


     //res.render("carts", { productos: productosEnCarrito });
  //} catch (error) {
    // console.error("Error al obtener el carrito", error);
     //res.status(500).json({ error: "Error interno del servidor" });
  //}
//});


//router.get("/api/carts/cid", async (req, res) => {
  //try {
    //const carts = await cartManager.getCartById(cartId);
    //console.log("Carts:", carts); // Imprime los carritos en la consola
    //res.status(200).json({ carts });
  //} catch (error) {
   // console.error("Error al obtener todos los carritos", error);
    //res.status(500).json({ error: "Error interno del servidor" });
  //}
//});
//router.get('/', async (req, res) => {
  //try {
    //  const allProducts = await manager.getProducts();
      //res.render('home', { title: 'Home', products: allProducts });
//  } catch (error) {
  //    console.error('Error al obtener productos:', error);
    //  res.status(500).send('Error interno del servidor');
  //}
//});

//router.get('/realtime',async (req, res) => {
  //let allProducts =  await manager.getProducts();
 //res.render('realTime', { title: 'Productos en tiempo real', products: allProducts });
//});
router.get("/api/carts/", async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();
    //console.log("Carts:", carts); 
    res.status(200).json({ carts });
  } catch (error) {
    console.error("Error al obtener todos los carritos", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
router.get("/api/carts/:cid", async (req, res) => {
  const cartId = req.params.cid; // Obtener el ID del carrito de la ruta

  try {
    // Llamar a la función getCartById con el ID del carrito
    const cart = await cartManager.getCartById(cartId);
    res.status(200).json(cart); // Enviar el carrito encontrado como respuesta
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
router.get('/carts', async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();
    res.render('cart', { title: 'Todos los carritos', carts: carts });
  } catch (error) {
    console.error('Error al obtener todos los carritos:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get("/register", (req, res) => {
  if(req.session.login) {
      return res.redirect("/profile");
  }
  res.render("register");
})

router.get("/login", (req, res) => {
  res.render("login");
})

router.get("/profile", (req, res) => {
  if(!req.session.login){
      return res.redirect("/login");
  }
  res.render("profile", {user: req.session.user})
})

export default router;
