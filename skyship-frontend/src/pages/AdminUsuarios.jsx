import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import api from "../api/axios";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    let isMounted = true;

    const obtenerUsuarios = async () => {
      try {
        const res = await api.get("/admin/usuarios");

        if (isMounted) {
          setUsuarios(res.data);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    obtenerUsuarios();

    return () => {
      isMounted = false;
    };
  }, []);

  const cambiarRol = async (usuario, nuevoRol) => {
    try {
      await api.put(`/admin/usuarios/${usuario.id}`, {
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: nuevoRol,
      });

      setUsuarios(
        usuarios.map((item) =>
          item.id === usuario.id
            ? { ...item, rol: nuevoRol }
            : item
        )
      );
    } catch (error) {
      console.error("Error al cambiar rol:", error);
      alert(error.response?.data?.message || "Error al cambiar rol");
    }
  };

  const eliminarUsuario = async (id) => {
    const confirmar = confirm(
      "¿Seguro que deseas eliminar este usuario?"
    );

    if (!confirmar) return;

    try {
      await api.delete(`/admin/usuarios/${id}`);

      setUsuarios(
        usuarios.filter((usuario) => usuario.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert(error.response?.data?.message || "Error al eliminar usuario");
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto =
      `${usuario.nombre} ${usuario.correo} ${usuario.rol}`.toLowerCase();

    return texto.includes(busqueda.toLowerCase());
  });

  return (
    <div>
      <AppNavbar />

      <section className="dashboard-section">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Panel administrativo</span>
            <h1>Gestión de usuarios</h1>
            <p>
              Administra usuarios registrados y permisos del sistema.
            </p>
          </div>
        </div>

        <div className="card filters-card">
          <input
            className="input"
            type="text"
            placeholder="Buscar por nombre, correo o rol..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="card">
          {loading ? (
            <p>Cargando usuarios...</p>
          ) : usuariosFiltrados.length === 0 ? (
            <p>No se encontraron usuarios.</p>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuariosFiltrados.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>
                        <div className="user-info">
                          <strong>{usuario.nombre}</strong>

                          {usuario.rol === "admin" && (
                            <span className="admin-badge">
                              ADMIN
                            </span>
                          )}
                        </div>
                      </td>

                      <td>{usuario.correo}</td>

                      <td>
                        <select
                          className={`role-select ${usuario.rol}`}
                          value={usuario.rol}
                          onChange={(e) =>
                            cambiarRol(usuario, e.target.value)
                          }
                        >
                          <option value="cliente">Cliente</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </td>

                      <td>
                        {new Date(
                          usuario.fecha_creacion
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          className="btn-danger"
                          onClick={() =>
                            eliminarUsuario(usuario.id)
                          }
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

export default AdminUsuarios;