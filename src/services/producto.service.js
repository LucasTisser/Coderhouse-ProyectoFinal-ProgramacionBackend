import { ProductosModel } from "../models/productos.model.js";
import { BaseDao } from "./BaseDao.js";

export class ProductoService extends BaseDao {
  ID_FIELD = "_id";

  static getInstance() {
    return new ProductoService();
  }

  constructor() {
    if (typeof ProductoService.instance === "object") {
      return ProductoService.instance;
    }
    super();
    ProductoService.instance = this;
    return this;
  }

  static async exists(id) {
    // Consulta si existe el producto en la DB de Mongo
    try {
      const product = await ProductosModel.findById(id);
      return product;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getAll() {
    // Devuelve todos los productos en la DB de Mongo
    try {
      return await ProductosModel.find();
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async getProductById(objectId) {
    // Devuelve un producto por su id en la DB de Mongo
    try {
      const product = await ProductosModel.findOne({
        [this.ID_FIELD]: objectId,
      });
      return product;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async create(object) {
    // crea un producto generado con una Id en la DB de Mongo
    try {
      return await ProductosModel.create(object);
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async updateProductById(id, object) {
    // actualiza un producto por su Id en la DB de Mongo
    try {
      await ProductosModel.findByIdAndUpdate(
        {
          [this.ID_FIELD]: id,
        },
        object,
        {
          runValidators: true,
        }
      );
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async deleteById(id) {
    // elimina un producto por su Id en la DB de Mongo
    try {
      return await ProductosModel.findByIdAndDelete({ [this.ID_FIELD]: id });
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
