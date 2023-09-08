const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

passport.use(
  new LocalStrategy(async (correo, password, done) => {
    try {
      const usuario = await Usuario.findOne({ where: { correo } });

      if (!usuario) {
        return done(null, false, { message: "Correo electrónico incorrecto" });
      }

      const passwordValido = await bcrypt.compare(password, usuario.password);

      if (!passwordValido) {
        return done(null, false, { message: "Contraseña incorrecta" });
      }

      return done(null, usuario);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findByPk(id);
    done(null, usuario);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
