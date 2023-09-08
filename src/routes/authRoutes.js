const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const UserRol = require("../models/UserRol");

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/registro", async (req, res) => {
  try {
    const { nombre, apellidos, correo, password, rol } = req.body;

    const rolUsuario = await UserRol.findOne({ where: { id: rol } });

    if (!rolUsuario) {
      return res.status(400).json({ error: "Rol no válido" });
    }

    const usuarioExistente = await Usuario.findOne({ where: { correo } });

    if (usuarioExistente) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    const user = await Usuario.create({
      nombre,
      apellidos,
      correo,
      password,
      rolId: rolUsuario.id,
    });

    res.status(201).json({
      mensaje: "El usuario con el id " + user.id + " se registro con éxito",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para iniciar sesión
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, usuario, info) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!usuario) {
      return res.status(401).json({ error: info.message });
    }

    req.logIn(usuario, (error) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.json({
        mensaje:
          "El usuario con el id " + usuario.id + " inició sesión exitosamente",
      });
    });
  })(req, res, next);
});

module.exports = router;
