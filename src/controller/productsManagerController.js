import ProductModel from "../models/products.models.js"

class ProductManager {
  async addProduct({ title, description, price, img, code, stock, category,status, thumbnails }) {
    try {


        if (!title || !description || !price || !code || !stock || !category|| !status ) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        const existeProducto = await ProductModel.findOne({ code: code })

        if (existeProducto) {
            console.log("El codigo debe ser unico")
            return;
        }

        const newProduct =  new ProductModel({
            title,
            description,
            price,
            img,
            code,
            stock,
            category,
            status: true,
            thumbnails: thumbnails || []
        });

        await newProduct.save();

    } catch (error) {
        console.log("Error al agregar producto", error);
        throw error;
    }
}
async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {
        const skip = (page - 1) * limit;

        let queryOptions = {};

        if (query) {
            queryOptions = { category: query };
        }

        const sortOptions = {};
        if (sort) {
            if (sort === 'asc' || sort === 'desc') {
                sortOptions.price = sort === 'asc' ? 1 : -1;
            }
        }

        const productos = await ProductModel
            .find(queryOptions)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const totalProducts = await ProductModel.countDocuments(queryOptions);

        const totalPages = Math.ceil(totalProducts / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        return {
            docs: productos,
            totalPages,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
            nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
        };
    } catch (error) {
        console.log("Error al obtener los productos", error);
        throw error;
    }
}


async getProductById(id) {
    try {
        const producto = await ProductModel.findById(id);

        if (!producto) {
            console.log("Producto no encontrado");
            return null;
        } else {
            console.log("Producto encontrado");
            return producto;
        }
    } catch (error) {
        console.log("Error al buscar producto por id", error);
        throw error;
    }
}

async updateProduct(id, productoActualizado) {
    try {

        const updateProduct = await ProductModel.findByIdAndUpdate(id, productoActualizado);

        if (!updateProduct) {
            console.log("Producto no encontrado");
            return null;
        }

        console.log("Producto actualizado: ");
        return updateProduct;


    } catch (error) {
        console.log("Error al actualizar el producto", error);
        throw error;
    }
}

async deleteProduct(id) {
    try {

        const deleteProduct = await ProductModel.findByIdAndDelete(id);

        if (!deleteProduct) {
            console.log("Producto no encontrado");
            return null;
        }

        console.log("Producto eliminado");
       
    } catch (error) {
        console.log("Error al eliminar producto", error);
        throw error;
    }
}
}

//const productManager = new ProductManager();
//const gato = await productManager.getProducts();
//console.log(gato);

export default ProductManager;
