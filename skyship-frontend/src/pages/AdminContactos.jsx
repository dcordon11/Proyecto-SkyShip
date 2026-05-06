import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import api from "../api/axios";

function AdminContactos() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerContactos = async () => {
      try {
        const res = await api.get("/admin/contactos");
        setContactos(res.data);
      } catch (error) {
        console.error("Error al obtener contactos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerContactos();
  }, []);

  return (
    <div>
      <AppNavbar />

      <section className="dashboard-section">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Panel administrativo</span>
            <h1>Mensajes de contacto</h1>
            <p>Revisa los mensajes enviados desde el formulario público.</p>
          </div>
        </div>

        <div className="card">
          {loading ? (
            <p>Cargando mensajes...</p>
          ) : contactos.length === 0 ? (
            <p>No hay mensajes registrados.</p>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Mensaje</th>
                    <th>Fecha</th>
                  </tr>
                </thead>

                <tbody>
                  {contactos.map((contacto) => (
                    <tr key={contacto.id}>
                      <td>{contacto.nombre}</td>
                      <td>{contacto.correo}</td>
                      <td>{contacto.telefono || "No registrado"}</td>
                      <td>{contacto.mensaje}</td>
                      <td>
                        {new Date(contacto.fecha_creacion).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminContactos;