import "../configs/db.config.js";
import { UsuariosModel } from "../models/usuarios.model.js";
import logger from "../utils/loggers/Log4jsLogger.js";

export class UsuarioService {
  ID_FIELD = "_id";
  EMAIL_FIELD = "email";

  static getInstance() {
    return new UsuarioService();
  }

  async registerUser(UserComplete) {
    // Registrar un usuario en la base de mongo, de acuerdo al schema de UsuariosModel
    try {
      const createdUser = UserComplete;
      return await UsuariosModel.create(createdUser);
    } catch (err) {
      logger.error(err);
      return false;
    }
  }

  async logUser(email, password) {
    // Busca un usuario por su Email, si el usuario no existe, devuelve falso
    // Compara la contraseña ingresada en la DB
    // Si la contraseña es correcta, devuelve los datos del usuario
    try {
      const userComplete = await UsuariosModel.findOne({
        [this.EMAIL_FIELD]: email,
      });
      if (!userComplete) {
        logger.info(`Email ${email} no existe`);
        return false;
      }
      const authpass = await userComplete.comparePassword(
        password,
        userComplete.password
      );

      if (authpass) {
        return userComplete;
      } else {
        return false;
      }
    } catch (err) {
      logger.error(err);
      return false;
    }
  }

  async deserializeUser(email) {
    // Busca un usuario por su Email en la DB y lo retorna
    try {
      const findedUser = await UsuariosModel.findOne({
        [this.EMAIL_FIELD]: email,
      });
      return findedUser;
    } catch (err) {
      logger.error(err);
      return false;
    }
  }
}
