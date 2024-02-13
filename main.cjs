const fs = require('node:fs').promises;

class ProductManager {
  static idCount = 1;

  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error("Por favor complete todos los campos");
      }
      if (this.products.some(item => item.code === code)) {
        throw new Error(`El código ${code} ya está en uso`);
      }

      const product = {
        id: ProductManager.idCount++,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };

      this.products.push(product);
      this.saveProducts();
      console.log(`Producto añadido correctamente con ID: ${product.id}`);
    } catch (error) {
      console.error("Error al agregar producto:", error.message);
    }
  }

 async saveProducts() {
    try {
      await fs.writeFileSync(this.path, JSON.stringify(this.products,null,2), 'utf8');
      console.log('Productos guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }

 async loadProducts() {
    try {
      const data =await fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
      console.log('Productos cargados correctamente.');
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const item = this.products.find(item => item.id === id)

    if (!item) {
      throw new Error("Producto no encontrado");
    } else {
      return item;
    }
  }

  updateProduct(id, title, description, price, thumbnail, code, stock) {
    const productIndex = this.products.findIndex(item => item.id === id);
    try {
      if (productIndex === -1) {
        throw new Error("No se encontró el producto");
      }

      this.products[productIndex].title = title;
      this.products[productIndex].description = description;
      this.products[productIndex].price = price;
      this.products[productIndex].thumbnail = thumbnail;
      this.products[productIndex].code = code;
      this.products[productIndex].stock = stock;

      console.log(`Producto con ID ${id} actualizado correctamente.`);
      this.saveProducts(); // Guardar los cambios
    } catch (error) {
      console.error("Error al actualizar producto:", error.message);
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(item => item.id === id);
    try {
      if (index === -1) {
        throw new Error(`No se encontró el producto con ID ${id}`);
      }

      this.products.splice(index, 1);
      console.log(`Producto con ID ${id} eliminado correctamente.`);
      this.saveProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
    }
  }
}
// add get getbyid

const manager = new ProductManager('productos.JSON');
manager.addProduct("Producto prueba 1", "Descripción 1", 200, "Sin imagen", "abc123", 25);
console.log(manager.getProducts());
manager.addProduct("Producto prueba 2", "Descripción 2", 200, "Sin imagen", "abc124", 30);
console.log(manager.getProducts());
manager.addProduct("Producto prueba 3", "Descripción 3", 200, "Sin imagen", "abc123", 306);
console.log(manager.getProducts());
manager.addProduct("Producto prueba 4", "Descripción 3", "Sin imagen", "abc123", 306);
console.log(manager.getProducts());
// Obtener productos por ID

console.log(manager.getProductById(1));

manager.updateProduct(1, "Nuevo Producto1", "Nueva Descripción", 20, "nueva_imagen.jpg", "XYZ789", 3);
console.log(manager.getProducts());

//borro produc segun id si no lo encuentro tira un msj 
manager.deleteProduct(4);
console.log(manager.getProducts());

// Crear una instancia de ProductManager y cargar los productos desde el archivo

manager.loadProducts();

// agrego
manager.addProduct("Producto prueba 1", "Descripción 1", 200, "Sin imagen", "abc123", 25);
console.log(manager.getProducts());