const db = require("../config/db");

// Crear envío
const crearEnvio = async (req, res) => {
  try {
    const {
      origen,
      destino,
      direccion_entrega,
      region,
      peso,
      tipo_paquete,
      metodo_entrega,
      costo_estimado,
    } = req.body;

    if (!direccion_entrega) {
      return res.status(400).json({
        message: "La dirección exacta de entrega es obligatoria",
      });
    }

    if (!origen || !destino) {
      return res.status(400).json({
        message: "Origen y destino son obligatorios",
      });
    }

    if (!peso || Number(peso) <= 0) {
      return res.status(400).json({
        message: "El peso debe ser mayor a 0",
      });
    }

    const usuario_id = req.user.id;

    const codigo_guia = "SKY-" + Date.now();

    const costoFinal = costo_estimado || Number(peso) * 8 + 25;

    await db.query(
      `INSERT INTO envios 
        (codigo_guia, usuario_id, origen, destino, direccion_entrega, region, peso, tipo_paquete, metodo_entrega, costo_estimado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        codigo_guia,
        usuario_id,
        origen,
        destino,
        direccion_entrega,
        region,
        peso,
        tipo_paquete,
        metodo_entrega,
        costoFinal,
      ]
    );

    res.status(201).json({
      message: "Envío creado correctamente",
      codigo_guia,
      costo_estimado: costoFinal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear envío",
      error: error.message,
    });
  }
};

// Obtener mis envíos
const obtenerMisEnvios = async (req, res) => {
  try {
    const usuario_id = req.user.id;

    const [envios] = await db.query(
      "SELECT * FROM envios WHERE usuario_id = ?",
      [usuario_id]
    );

    res.json(envios);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener envíos",
      error: error.message,
    });
  }
};

// Obtener detalle
const obtenerEnvio = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const [envio] = await db.query(
      "SELECT * FROM envios WHERE id = ? AND usuario_id = ?",
      [id, usuario_id]
    );

    if (envio.length === 0) {
      return res.status(404).json({
        message: "Envío no encontrado",
      });
    }

    res.json(envio[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener envío",
      error: error.message,
    });
  }
};

// Actualizar envío propio
const actualizarEnvio = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const {
      origen,
      destino,
      direccion_entrega,
      region,
      peso,
      tipo_paquete,
      metodo_entrega,
      costo_estimado,
    } = req.body;

    if (!origen || !destino) {
      return res.status(400).json({
        message: "Origen y destino son obligatorios",
      });
    }

    if (!peso || Number(peso) <= 0) {
      return res.status(400).json({
        message: "El peso debe ser mayor a 0",
      });
    }

    const costoFinal = costo_estimado || Number(peso) * 8 + 25;

    const [result] = await db.query(
      `UPDATE envios
       SET origen = ?, destino = ?, direccion_entrega = ?, region = ?, peso = ?, 
           tipo_paquete = ?, metodo_entrega = ?, costo_estimado = ?
       WHERE id = ? AND usuario_id = ?`,
      [
        origen,
        destino,
        direccion_entrega,
        region,
        peso,
        tipo_paquete,
        metodo_entrega,
        costoFinal,
        id,
        usuario_id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Envío no encontrado" });
    }

    res.json({ message: "Envío actualizado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar envío",
      error: error.message,
    });
  }
};

// Eliminar envío propio
const eliminarEnvio = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const [result] = await db.query(
      "DELETE FROM envios WHERE id = ? AND usuario_id = ?",
      [id, usuario_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Envío no encontrado" });
    }

    res.json({ message: "Envío eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar envío",
      error: error.message,
    });
  }
};

module.exports = {
  crearEnvio,
  obtenerMisEnvios,
  obtenerEnvio,
  actualizarEnvio,
  eliminarEnvio,
};