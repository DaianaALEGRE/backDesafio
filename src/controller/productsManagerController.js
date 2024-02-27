import fs from 'fs';

class ProductManager {
  static idCount = 1;
  static products = [];

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
      const maxId = this.products.reduce((max, product) => Math.max(max, product.id), 0);
      const product = {
        id: maxId + 1, // Corrección aquí
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

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');

      console.log('Productos guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
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

  updateProduct(id, updatedProduct) {
    try {
        const productIndex = this.products.findIndex(item => item.id === id);
        if (productIndex === -1) {
            throw new Error("No se encontró el producto");
        }

        // Actualizar solo los campos proporcionados en updatedProduct
        for (let key in updatedProduct) {
            if (updatedProduct.hasOwnProperty(key)) {
                this.products[productIndex][key] = updatedProduct[key];
            }
        }

        console.log(`Producto con ID ${id} actualizado correctamente.`);
        this.saveProducts(); 
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


const manager = new ProductManager('product.JSON');

export default ProductManager;