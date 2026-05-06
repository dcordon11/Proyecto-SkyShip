import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import api from "../api/axios";

function ClienteDashboard() {
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const obtenerEnvios = async () => {
      try {
        const res = await api.get("/envios");
        setEnvios(res.data);
      } catch (error) {
        console.error("Error al obtener envíos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerEnvios();
  }, []);

  const totalEnvios = envios.length;
  const pendientes = envios.filter((e) => e.estado === "pendiente").length;
  const enTransito = envios.filter((e) => e.estado === "en_transito").length;
  const entregados = envios.filter((e) => e.estado === "entregado").length;

  return (
    <div>
      <AppNavbar />

      <section className="dashboard-section">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Panel del cliente</span>
            <h1>Hola, {user?.nombre || "Cliente"}</h1>
            <p>Gestiona tus solicitudes de envío y consulta el estado de tus paquetes.</p>
          </div>

          <Link className="btn-primary" to="/crear-envio">
            Crear envío
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total envíos</span>
            <strong>{totalEnvios}</strong>
          </div>

          <div className="stat-card">
            <span>Pendientes</span>
            <strong>{pendientes}</strong>
          </div>

          <div className="stat-card">
            <span>En tránsito</span>
            <strong>{enTransito}</strong>
          </div>

          <div className="stat-card">
            <span>Entregados</span>
            <strong>{entregados}</strong>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="card">
            <div className="table-header">
              <h2>Últimos envíos</h2>
              <Link to="/mis-envios">Ver todos</Link>
            </div>

            {loading ? (
              <p>Cargando envíos...</p>
            ) : envios.length === 0 ? (
              <p>Aún no tienes envíos registrados.</p>
            ) : (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Destino</th>
                      <th>Estado</th>
                      <th>Costo</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>

                  <tbody>
                    {envios.slice(0, 5).map((envio) => (
                      <tr key={envio.id}>
                        <td>{envio.codigo_guia}</td>
                        <td>{envio.destino}</td>
                        <td>
                          <span className={`status ${envio.estado}`}>
                            {envio.estado}
                          </span>
                        </td>
                        <td>Q{Number(envio.costo_estimado).toFixed(2)}</td>
                        <td>{new Date(envio.fecha_creacion).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClienteDashboard;