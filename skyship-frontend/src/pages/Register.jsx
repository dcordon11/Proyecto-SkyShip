import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmarPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validarFormulario = () => {
    if (!form.nombre.trim()) return "El nombre completo es obligatorio";
    if (!form.correo.trim()) return "El correo es obligatorio";
    if (!form.correo.includes("@")) return "El correo no es válido";
    if (!form.telefono.trim()) return "El teléfono es obligatorio";
    if (!form.direccion.trim()) return "La dirección es obligatoria";
    if (!form.password.trim()) return "La contraseña es obligatoria";

    if (form.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    if (form.password !== form.confirmarPassword) {
      return "Las contraseñas no coinciden";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validarFormulario();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await api.post("/auth/register", {
        nombre: form.nombre,
        correo: form.correo,
        telefono: form.telefono,
        direccion: form.direccion,
        password: form.password,
      });

      setSuccess("Cuenta creada correctamente. Ahora puedes iniciar sesión.");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear la cuenta");
    }
  };

  return (
    <div>
      <Navbar />

      <section className="auth-container">
        <div className="auth-card">
          <div className="login-header">
            <span className="eyebrow">Crear cuenta</span>
            <h2>Únete a SkyShip Express</h2>
            <p>Regístrate para crear solicitudes de envío y rastrear tus paquetes.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                className="input"
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                className="input"
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="correo@email.com"
              />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                className="input"
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Ej: 5555-5555"
              />
            </div>

            <div className="form-group">
              <label>Dirección</label>
              <textarea
                className="input"
                rows="3"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Dirección principal"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                className="input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div className="form-group">
              <label>Confirmar contraseña</label>
              <input
                className="input"
                type="password"
                name="confirmarPassword"
                value={form.confirmarPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
              />
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button className="btn-primary login-btn">Crear cuenta</button>
          </form>

          <p className="auth-footer-text">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;