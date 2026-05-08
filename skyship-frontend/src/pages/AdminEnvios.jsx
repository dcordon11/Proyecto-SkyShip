import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import api from "../api/axios";

function AdminEnvios() {
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    let isMounted = true;

    const obtenerEnvios = async () => {
      try {
        const res = await api.get("/admin/envios");

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

  const cambiarEstado = async (envio, nuevoEstado) => {
    try {
      await api.put(`/admin/envios/${envio.id}`, {
        origen: envio.origen,
        destino: envio.destino,
        direccion_entrega: envio.direccion_entrega,
        region: envio.region,
        peso: envio.peso,
        tipo_paquete: envio.tipo_paquete,
        metodo_entrega: envio.metodo_entrega,
        estado: nuevoEstado,
        costo_estimado: envio.costo_estimado,
      });

      setEnvios(
        envios.map((item) =>
          item.id === envio.id ? { ...item, estado: nuevoEstado } : item
        )
      );
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert(error.response?.data?.message || "Error al cambiar estado");
    }
  };

  const eliminarEnvio = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este envío?");

    if (!confirmar) return;

    try {
      await api.delete(`/admin/envios/${id}`);
      setEnvios(envios.filter((envio) => envio.id !== id));
    } catch (error) {
      console.error("Error al eliminar envío:", error);
      alert(error.response?.data?.message || "Error al eliminar envío");
    }
  };

  const enviosFiltrados = envios.filter((envio) => {
    const coincideEstado = filtro === "todos" || envio.estado === filtro;

    const texto = `${envio.codigo_guia || ""} ${envio.nombre || ""} ${
      envio.destino || ""
    } ${envio.origen || ""}`.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());

    return coincideEstado && coincideBusqueda;
  });

  return (
    <div>
      <AppNavbar />

      <section className="dashboard-section">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Panel administrativo</span>
            <h1>Gestión de envíos</h1>
            <p>
              Revisa todos los envíos registrados, cambia estados y administra
              solicitudes.
            </p>
          </div>
        </div>

        <div className="card filters-card">
          <input
            className="input"
            type="text"
            placeholder="Buscar por guía, cliente, origen o destino..."
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
                    <th>Cliente</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Dirección</th>
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
                      <td>{envio.nombre || "Cliente"}</td>
                      <td>{envio.origen}</td>
                      <td>{envio.destino}</td>
                      <td>{envio.direccion_entrega || "No registrada"}</td>
                      <td>
                        <select
                          className={`status-select ${envio.estado}`}
                          value={envio.estado}
                          onChange={(e) =>
                            cambiarEstado(envio, e.target.value)
                          }
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="recibido">Recibido</option>
                          <option value="en_transito">En tránsito</option>
                          <option value="en_reparto">En reparto</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
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

export default AdminEnvios;