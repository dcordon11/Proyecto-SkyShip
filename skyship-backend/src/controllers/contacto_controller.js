const db = require("../config/db");

const crearContacto = async (req, res) => {
  try {
    const { nombre, correo, telefono, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({
        message: "Nombre, correo y mensaje son obligatorios",
      });
    }

    await db.query(
      `INSERT INTO contactos (nombre, correo, telefono, mensaje)
       VALUES (?, ?, ?, ?)`,
      [nombre, correo, telefono, mensaje]
    );

    res.status(201).json({
      message: "Mensaje enviado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al enviar mensaje",
      error: error.message,
    });
  }
};

module.exports = {
  crearContacto,
};