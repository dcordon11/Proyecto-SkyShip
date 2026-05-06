const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth_routes");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API SkyShip Express funcionando" });
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS resultado");
    res.json({
      message: "Conexión a MySQL correcta",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error conectando a MySQL",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const verifyToken = require("./middlewares/auth_middleware");

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "Acceso permitido",
    user: req.user,
  });
});

const checkRole = require("./middlewares/roles_middleware");

app.get(
  "/api/admin-test",
  verifyToken,
  checkRole("admin"),
  (req, res) => {
    res.json({
      message: "Acceso SOLO para admin",
    });
  }
);

const enviosRoutes = require("./routes/envios_routes");

app.use("/api/envios", enviosRoutes);

const adminRoutes = require("./routes/admin_routes");

app.use("/api/admin", adminRoutes);

const contactoRoutes = require("./routes/contacto_routes");

app.use("/api/contacto", contactoRoutes);