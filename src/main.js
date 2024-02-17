import { promises as fsPromises } from 'node:fs';
import express from 'express';


class ProductManager {
  static idCount = 1;

  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
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
      await this.saveProducts();
      console.log(`Producto añadido correctamente con ID: ${product.id}`);
    } catch (error) {
      console.error("Error al agregar producto:", error.message);
    }
  }

  async saveProducts() {
    try {
      await fsPromises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
      console.log('Productos guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }

  async loadProducts() {
    try {
      const data = await fsPromises.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
      console.log('Producto cargado correctamente.');
    } catch (error) {
      console.error('Error al cargar producto:', error);
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

const manager = new ProductManager('./productos.json') ;

//console.log(manager.getProductById(1));
export default ProductManager;
 
