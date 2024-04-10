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

    async getCartById(cartId) {
        try {
            const carrito = await CartModel.findById(cartId);

            if (!carrito) {
                throw new Error(`No existe un carrito con el id ${cartId}`);
            }

            return carrito;
        } catch (error) {
            console.error("Error al obtener el carrito por ID", error);
            throw error;
        }
    }

    async addProductCart(cartId, productId, quantity = 1) {
        try {
            const carrito = await this.getCartById(cartId);
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
}

export default CartManager;