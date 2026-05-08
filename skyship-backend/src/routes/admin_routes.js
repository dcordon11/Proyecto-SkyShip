const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth_middleware");
const checkRole = require("../middlewares/roles_middleware");
const { obtenerDashboard } = require("../controllers/admin_controller");

const {
  obtenerTodosEnvios,
  actualizarEnvioAdmin,
  eliminarEnvioAdmin,
  obtenerUsuarios,
  obtenerContactos,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/admin_controller");

// TODAS protegidas con admin
router.get("/envios", verifyToken, checkRole("admin"), obtenerTodosEnvios);

router.put(
  "/envios/:id",
  verifyToken,
  checkRole("admin"),
  actualizarEnvioAdmin
);

router.delete(
  "/envios/:id",
  verifyToken,
  checkRole("admin"),
  eliminarEnvioAdmin
);

router.get("/usuarios", verifyToken, checkRole("admin"), obtenerUsuarios);
router.get(
  "/dashboard",
  verifyToken,
  checkRole("admin"),
  obtenerDashboard
);

router.get(
  "/contactos",
  verifyToken,
  checkRole("admin"),
  obtenerContactos
);

router.get(
  "/usuarios",
  verifyToken,
  checkRole("admin"),
  obtenerUsuarios
);

router.put(
  "/usuarios/:id",
  verifyToken,
  checkRole("admin"),
  actualizarUsuario
);

router.delete(
  "/usuarios/:id",
  verifyToken,
  checkRole("admin"),
  eliminarUsuario
);


module.exports = router;