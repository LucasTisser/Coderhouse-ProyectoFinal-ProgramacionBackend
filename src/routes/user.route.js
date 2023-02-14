import express from "express";
import * as userController from "../controllers/user.cotroller.js";
import passport from "passport";

const router = express.Router();

// GET /api/usuarios/login
router.get("/login", userController.logInView);
// GET /api/usuarios/signup
router.get("/signup", userController.signUpView);
// GET /api/usuarios
router.get("/", userController.homeView);
// GET /api/usuarios/logout
router.get("/logout", userController.logOutView);

// POST api/usuarios/signup
router.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/api/usuarios/signupError",
    successRedirect: "/api/usuarios/login",
  })
);
// POST /api/usuarios/login
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/usuarios/faillogin",
    successRedirect: "/api/usuarios/datos",
  })
);

// GET api/usuarios/signupError
router.get("/signupError", userController.signUpError);
// GET /api/usuarios/faillogin
router.get("/faillogin", userController.signInError);

// GET /api/usuarios/datos
router.get("/datos", userController.datosUsuario);
// GET /api/usuarios/userData
router.get("/userData", userController.userData);

export default router;
