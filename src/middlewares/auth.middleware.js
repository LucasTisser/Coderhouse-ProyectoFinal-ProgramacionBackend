export default function auth(req, res, next) {
  // req.session.login
  // ? next()
  // : res.status(401).send('No autorizado')

  // Para usar en postman
  req.header("authorization") == process.env.TOKEN
    ? next()
    : res.status(401).json({ error: "unauthorized" });
}
