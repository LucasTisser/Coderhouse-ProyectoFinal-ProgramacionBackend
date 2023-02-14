import { htmlNewUserTemplate } from "../utils/notifications/htmltemplates/NewUserCreatedTemplate.js";
import passport from "passport";
import { Strategy } from "passport-local";
import { sendGmail } from "../utils/notifications/EmailSender.js";
import { UsuarioService } from "../services/usuario.service.js";

const usuarioService = UsuarioService.getInstance();

// Strategy de passport local, registra el usuario a traves del servicio y
// antes de devolver un usuario, envia un gmail al administrador con los datos del usuario creado
export const signupUser = () => {
  passport.use(
    "signup",
    new Strategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const user = {
          email: req.body.email,
          password,
          username,
          direccion: req.body.direccion,
          edad: req.body.edad,
          foto: req.body.foto,
          numeroTelefono: req.body.numeroTelefono,
        };
        const register = await usuarioService.registerUser(user);

        if (user) {
          const now = new Date();
          const newUserTemplateEmail = htmlNewUserTemplate(
            register,
            now.toLocaleString()
          );
          await sendGmail("Nuevo usuario creado", newUserTemplateEmail);
        }
        return done(null, user);
      }
    )
  );
};

// Strategy de passport local para logear un usuario
// Llama al servicio para logear un user, enviando email y password como parametros
export const loginUser = () => {
  passport.use(
    "login",
    new Strategy(
      {
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const user = await usuarioService.logUser(email, password);

        if (user) {
          req.session.login = true;
          return done(null, user);
        } else {
          req.session.login = false;
          return done(null, false);
        }
      }
    )
  );
};

// Serializa un user con passport
export const serializer = () => {
  passport.serializeUser((userComplete, done) => {
    done(null, userComplete.email);
  });
};

// Deserializa un user con passport
export const deserializer = () => {
  passport.deserializeUser(async (email, done) => {
    const usuario = await usuarioService.deserializeUser(email);
    done(null, usuario);
  });
};
