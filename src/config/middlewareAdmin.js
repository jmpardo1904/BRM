module.exports = (req, res, next) => {
  if (req.user && req.user.rolId === 1) {
    return next(); // Usuario autenticado y con rol de Administrador
  } else {
    return res.status(403).json({ mensaje: "Acceso no autorizado" }); // Usuario no tiene el rol adecuado
  }
};
