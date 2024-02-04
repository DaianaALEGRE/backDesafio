class ProductManager {
  static idCount = 1;
  constructor() {

    this.productos = [];


  };

  addProducto(title, description, price, thumbnail, code, stock) {
   
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error("completar todos los campos")
        ;
      }
      if (this.productos.some(item => item.code === code)) {
        throw new Error(`el codigo ${code} ya se encuentra en uso`)
        ;
      } const producto = {
      id: ProductManager.idCount++,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
      
        this.productos.push(producto);
      }
      catch (error) {
        console.error(error.message);
      }
   }
  getProducts() {
    return this.productos;
  }
  getProductsById(id) {
     const item=this.productos.find(item => item.id === id)
    
     if (!item) {
      console.log( "not found")
    } else {
      return item;
    }
   
    
  }

}

// add get getbyid

const manager = new ProductManager();
manager.addProducto("Producto prueba 1", "Descripción 1", 200, "Sin imagen", "abc123", 25);
console.log(manager.getProducts());
manager.addProducto("Producto prueba 2", "Descripción 2", 200, "Sin imagen", "abc124", 30);
console.log(manager.getProducts());
manager.addProducto("Producto prueba 3", "Descripción 3", 200, "Sin imagen", "abc123", 306);
console.log(manager.getProducts());
manager.addProducto("Producto prueba 4", "Descripción 3", "Sin imagen", "abc123", 306);
console.log(manager.getProducts());
// Obtener productos por ID

console.log(manager.getProductsById(1));



