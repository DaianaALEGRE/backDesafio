import CartModel from "../models/cart.models.js";


class CartManager {

    async createCart() {
        try {
            const nuevoCarrito = new CartModel({ products: [] });
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear el carrito", error)
            throw error;
        }
    }

    async getCartById(cid) {
        try {
           
        const carrito = await CartModel.findById(cid);
 console.log( cid);
            if (!carrito) {
                throw new Error(`No existe un carrito con el id ${cid}`);
            }

            return carrito;
        } catch (error) {
            console.error("Error al obtener el carrito por ID", error);
            throw error;
        }
    }

    async addProductCart(cid, productId, quantity = 1) {
        try {
            const carrito = await this.getCartById(cid);
            const existeProducto = carrito.products.find(item => item.product.toString() === productId);

            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productId, quantity });
            }

            carrito.markModified("products");

            await carrito.save();
            return carrito;
        } catch (error) {
            console.error("Error al agregar un producto", error);
            throw error;
        }
    }

    async  getAllCarts() {
        try {
            const carts = await CartModel.find();
            return carts;
        } catch (error) {
            console.error("Error al obtener todos los carritos", error);
            throw error;
        }
    }

}



export default CartManager;