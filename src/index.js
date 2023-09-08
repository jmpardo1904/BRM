const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("./config/auth");
const session = require("express-session");
const productosRoutes = require("./routes/productos");
const comprasRoutes = require("./routes/compras");
const authRoutes = require("./routes/authRoutes");
const facturaRoutes = require("./routes/facturaRoutes");

const middleware = require("./config/middleware");
const middlewareAdmin = require("./config/middlewareAdmin");

const app = express();

// settings
app.set("port", 3000);

app.use(
  session({
    secret: "tu_secreto",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

// app.use("/productos", middleware, middlewareAdmin, productosRoutes);
// app.use("/compras", middleware, comprasRoutes);
app.use("/productos", productosRoutes);
app.use("/compras", comprasRoutes);
app.use("/factura", facturaRoutes);
app.use("/auth", authRoutes);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
