module.exports = (req, res, next) => {
  // Si el usuario está autenticado, permite que continúe
  if (req.isAuthenticated()) {
    return next();
  }
  // Si el usuario no está autenticado, redirige a la página de inicio de sesión u otra acción adecuada
  res.status(401).json({ mensaje: "No autenticado" });
};
