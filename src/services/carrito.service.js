import { CarritosModel } from "../models/carritos.model.js";
import { BaseDao } from "./BaseDao.js";

export class CarritoService extends BaseDao {
  ID_FIELD = "_id";

  static getInstance() {
    return new CarritoService();
  }

  constructor() {
    if (typeof CarritoService.instance === "object") {
      return CarritoService.instance;
    }
    super();
    CarritoService.instance = this;
    return this;
  }

  async create() {
    // Crea un carrito en la DB de mongo.
    try {
      return await CarritosModel.create({});
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async getAll() {
    // Devuelve todos los carritos en la DB de mongo
    try {
      return await CarritosModel.find();
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async deleteById(id) {
    // Elimina un carrito por su id de la DB de mongo
    try {
      return await CarritosModel.findByIdAndDelete({ [this.ID_FIELD]: id });
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async saveProductToCart(id, obj) {
    // Guarda un producto en el carrito, en la DB de mongo
    try {
      const cart = await CarritosModel.findById(id);
      cart.productos.push(obj.productId);
      cart.save();
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async deleteProductFromCart(id, productId) {
    // Elimina un producto en el carrito, en la DB de mongo
    try {
      const cart = await CarritosModel.findById(id);
      cart.productos.remove(productId);
      cart.save();
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async getAllProductsFromCart(id) {
    // Devuelve todos los productos del carrito, en la DB de mongo
    try {
      const cart = await CarritosModel.findById(id).select({
        productos: 1,
        _id: 0,
      });
      return cart.productos;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
