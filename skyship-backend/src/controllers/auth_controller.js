const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = async (req, res) => {
  try {
    const { nombre, correo, telefono, direccion, password } = req.body;

    if (!nombre || !correo || !telefono || !direccion || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const [existingUser] = await db.query(
      "SELECT id FROM usuarios WHERE correo = ?",
      [correo]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO usuarios 
      (nombre, correo, telefono, direccion, password, rol) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, correo, telefono, direccion, hashedPassword, "cliente"]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar usuario",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
    }

    const [users] = await db.query(
      "SELECT * FROM usuarios WHERE correo = ? AND activo = true",
      [correo]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        correo: user.correo,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        telefono: user.telefono,
        direccion: user.direccion,
        rol: user.rol,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};