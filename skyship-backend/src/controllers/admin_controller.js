const db = require("../config/db");

// Ver todos los envíos
const obtenerTodosEnvios = async (req, res) => {
  try {
    const [envios] = await db.query(
      `SELECT e.*, u.nombre 
       FROM envios e
       JOIN usuarios u ON e.usuario_id = u.id`
    );

    res.json(envios);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener envíos",
      error: error.message,
    });
  }
};

// Actualizar cualquier envío (admin)
const actualizarEnvioAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      origen,
      destino,
      estado,
      peso,
      tipo_paquete,
      metodo_entrega,
    } = req.body;

    const costo_estimado = peso ? peso * 8 + 25 : 25;

    const [result] = await db.query(
      `UPDATE envios
       SET origen=?, destino=?, estado=?, peso=?, tipo_paquete=?, metodo_entrega=?, costo_estimado=?
       WHERE id=?`,
      [
        origen,
        destino,
        estado,
        peso,
        tipo_paquete,
        metodo_entrega,
        costo_estimado,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Envío no encontrado" });
    }

    res.json({ message: "Envío actualizado (admin)" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar envío",
      error: error.message,
    });
  }
};

// Eliminar envío (admin)
const eliminarEnvioAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM envios WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Envío no encontrado" });
    }

    res.json({ message: "Envío eliminado (admin)" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar envío",
      error: error.message,
    });
  }
};

// Ver usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const [usuarios] = await db.query(
      "SELECT id, nombre, correo, rol FROM usuarios"
    );

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

// Dashboard admin
const obtenerDashboard = async (req, res) => {
  try {
    // Total usuarios
    const [[usuarios]] = await db.query(
      "SELECT COUNT(*) as total FROM usuarios"
    );

    // Total envíos
    const [[envios]] = await db.query(
      "SELECT COUNT(*) as total FROM envios"
    );

    // Envíos por estado
    const [porEstado] = await db.query(
      `SELECT estado, COUNT(*) as total 
       FROM envios 
       GROUP BY estado`
    );

    // Ingresos estimados
    const [[ingresos]] = await db.query(
      "SELECT SUM(costo_estimado) as total FROM envios"
    );

    // Envíos por región
    const [porRegion] = await db.query(
      `SELECT region, COUNT(*) as total 
       FROM envios 
       GROUP BY region`
    );

    res.json({
      totalUsuarios: usuarios.total,
      totalEnvios: envios.total,
      ingresosEstimados: ingresos.total || 0,
      enviosPorEstado: porEstado,
      enviosPorRegion: porRegion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener dashboard",
      error: error.message,
    });
  }
};

const obtenerContactos = async (req, res) => {
  try {
    const [contactos] = await db.query(
      "SELECT * FROM contactos ORDER BY fecha_creacion DESC"
    );

    res.json(contactos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener contactos",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerTodosEnvios,
  actualizarEnvioAdmin,
  eliminarEnvioAdmin,
  obtenerUsuarios,
  obtenerDashboard, 
  obtenerContactos,
};