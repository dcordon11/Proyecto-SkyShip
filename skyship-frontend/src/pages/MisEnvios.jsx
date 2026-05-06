import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import api from "../api/axios";

function MisEnvios() {
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
  let isMounted = true;

  const obtenerEnvios = async () => {
    try {
      const res = await api.get("/envios");

      if (isMounted) {
        setEnvios(res.data);
      }
    } catch (error) {
      console.error("Error al obtener envíos:", error);
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  obtenerEnvios();

  return () => {
    isMounted = false;
  };
}, []);

  const eliminarEnvio = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este envío?");

    if (!confirmar) return;

    try {
      await api.delete(`/envios/${id}`);
      setEnvios(envios.filter((envio) => envio.id !== id));
    } catch (error) {
      console.error("Error al eliminar envío:", error);
    }
  };

  const enviosFiltrados = envios.filter((envio) => {
    const coincideEstado = filtro === "todos" || envio.estado === filtro;

    const codigo = envio.codigo_guia || "";
    const destino = envio.destino || "";
    const origen = envio.origen || "";

    const coincideBusqueda =
      codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      destino.toLowerCase().includes(busqueda.toLowerCase()) ||
      origen.toLowerCase().includes(busqueda.toLowerCase());

    return coincideEstado && coincideBusqueda;
  });

  return (
    <div>
      <AppNavbar />

      <section className="dashboard-section">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Mis envíos</span>
            <h1>Historial de envíos</h1>
            <p>Consulta tus paquetes registrados y su estado actual.</p>
          </div>
        </div>

        <div className="card filters-card">
          <input
            className="input"
            type="text"
            placeholder="Buscar por código de guía, origen o destino..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="input"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="recibido">Recibido</option>
            <option value="en_transito">En tránsito</option>
            <option value="en_reparto">En reparto</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div className="card">
          {loading ? (
            <p>Cargando envíos...</p>
          ) : enviosFiltrados.length === 0 ? (
            <p>No se encontraron envíos.</p>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Dirección exacta</th>
                    <th>Estado</th>
                    <th>Costo</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {enviosFiltrados.map((envio) => (
                    <tr key={envio.id}>
                      <td>{envio.codigo_guia}</td>
                      <td>{envio.origen}</td>
                      <td>{envio.destino}</td>
                      <td>{envio.direccion_entrega || "No registrada"}</td>
                      <td>
                        <span className={`status ${envio.estado}`}>
                          {envio.estado}
                        </span>
                      </td>
                      <td>Q{Number(envio.costo_estimado).toFixed(2)}</td>
                      <td>
                        {new Date(envio.fecha_creacion).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="btn-danger"
                          onClick={() => eliminarEnvio(envio.id)}
                        >
                          Eliminar
                        </button>
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

export default MisEnvios;