const express = require("express");
const router = express.Router();

const { crearContacto } = require("../controllers/contacto_controller");

router.post("/", crearContacto);

module.exports = router;