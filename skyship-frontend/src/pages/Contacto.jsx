import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
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
    if (!form.nombre.trim()) return "El nombre es obligatorio";
    if (!form.correo.trim()) return "El correo es obligatorio";
    if (!form.correo.includes("@")) return "El correo no es válido";
    if (!form.mensaje.trim()) return "El mensaje es obligatorio";
    if (form.mensaje.trim().length < 10) {
      return "El mensaje debe tener al menos 10 caracteres";
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
      await api.post("/contacto", form);

      setSuccess("Mensaje enviado correctamente");

      setForm({
        nombre: "",
        correo: "",
        telefono: "",
        mensaje: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error al enviar mensaje");
    }
  };

  return (
    <div>
      <Navbar />

      <section className="page-hero">
        <span className="eyebrow">Contacto</span>
        <h1>Estamos aquí para ayudarte</h1>
        <p>
          ¿Tienes dudas sobre tus envíos o necesitas asistencia? Nuestro equipo
          está listo para ayudarte.
        </p>
      </section>

      <section className="section">
        <div className="two-columns">
          <div className="card">
            <h2>Envíanos un mensaje</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  className="input"
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label>Correo</label>
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
                <label>Mensaje</label>
                <textarea
                  className="input"
                  rows="5"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje..."
                ></textarea>
              </div>

              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}

              <button className="btn-primary">Enviar mensaje</button>
            </form>
          </div>

          <div className="card">
            <h2>Información de contacto</h2>

            <p>
              Puedes comunicarte con nosotros a través de los siguientes medios:
            </p>

            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>📍 Dirección:</strong>
                <br />
                Ciudad de Guatemala
              </p>

              <p>
                <strong>📞 Teléfono:</strong>
                <br />
                +502 5555-5555
              </p>

              <p>
                <strong>📧 Correo:</strong>
                <br />
                contacto@skyship.com
              </p>

              <p>
                <strong>⏰ Horario:</strong>
                <br />
                Lunes a viernes de 8:00 AM a 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="section-heading">
          <span className="eyebrow">Ubicación</span>
          <h2>Encuéntranos fácilmente</h2>
        </div>

        <div className="card map-card">
          <iframe
            title="Ubicación SkyShip Express"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56463.92080811566!2d-90.54860681364494!3d14.611552958847213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a327e863f90b%3A0x2049d50276f20c49!2sZona%2016%2C%20Cdad.%20de%20Guatemala!5e1!3m2!1ses!2sgt!4v1778091966832!5m2!1ses!2sgt" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            width="100%"
            height="320"
            style={{ border: 0, borderRadius: "16px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 SkyShip Express. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Contacto;