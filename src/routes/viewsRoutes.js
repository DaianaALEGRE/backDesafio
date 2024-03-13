import {Router} from "express";
const router = Router(); 

//en biblio desde aca renderiza la ruta
//router.get("/partials/realTime", (req, res) => {

app.router('/realtime', (req, res) => {
  let allProducts =  manager.getProducts();
  res.render('partials/realTime', { title: 'este es el home', products: allProducts });
});
//seccion completa que saque de app.get(segun diapo 38 clase 6)
router.get('/',  (req, res) => {

  let allProducts =  manager.getProducts();
  res.render('home', { title: 'cosita',products: allProducts });

});
export default router; 