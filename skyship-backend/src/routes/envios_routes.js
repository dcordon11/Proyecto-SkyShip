const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth_middleware");

const {
  crearEnvio,
  obtenerMisEnvios,
  obtenerEnvio,
  actualizarEnvio,
  eliminarEnvio,
} = require("../controllers/envios_controller");

router.post("/", verifyToken, crearEnvio);
router.get("/", verifyToken, obtenerMisEnvios);
router.get("/:id", verifyToken, obtenerEnvio);
router.put("/:id", verifyToken, actualizarEnvio);
router.delete("/:id", verifyToken, eliminarEnvio);

module.exports = router;