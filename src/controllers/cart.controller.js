import { CarritoService } from "../services/carrito.service.js";
import { ProductoService } from "../services/producto.service.js";

const carritoService = CarritoService.getInstance();

// Llama al servicio para crear un carrito. Devuelve su id de carrito
export async function create(req, res) {
  const newCart = await carritoService.create();

  newCart
    ? res.status(200).json({ success: "Cart added with ID " + newCart._id })
    : res.status(500).json({ error: "there was an error" });
}

// Llama al servicio para eliminar un carrito, a travez de su id, enviada por req.params
export async function remove(req, res) {
  const { id } = req.params;
  const wasDeleted = await carritoService.deleteById(id);

  wasDeleted
    ? res.status(200).json({ success: "cart successfully removed" })
    : res.status(404).json({ error: "cart not found1" });
}

// Llama al servicio para añadir un producto al carrito,
// consulta si existe el producto en la DB, a traves de su id de producto, tomado desde el body
// y si es verdadero, lo guarda en el carrito, a travez de la id de carrito
export async function addProduct(req, res) {
  const { id } = req.params;
  const { body } = req;

  const productExist = await ProductoService.exists(body.productId);

  if (productExist) {
    await carritoService.saveProductToCart(id, body);
  } else {
    res.status(404).json({ error: "product not found" });
  }
}

// Llama al servicio para pedir todos los productos que esten en el carrito por su id
export async function getProducts(req, res) {
  const { id } = req.params;
  const cartProducts = await carritoService.getAllProductsFromCart(id);

  cartProducts
    ? res.status(200).json(cartProducts)
    : res.status(404).json({ error: "cart not found" });
}

// Llama al servicio para quitar un producto que se encuentre en el carrito
// el id del producto y del carrito se mencionan el los params
export async function removeProduct(req, res) {
  const { id, id_prod } = req.params;

  const wasDeleted = await carritoService.deleteProductFromCart(id, id_prod);
  wasDeleted
    ? res.status(200).json({ success: "that product is no longer in the cart" })
    : res.status(400).json({ error: "there was some problem" });
}
