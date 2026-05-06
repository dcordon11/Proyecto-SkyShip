import { Link, NavLink, useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const dashboardPath =
    user?.rol === "admin" ? "/admin-dashboard" : "/cliente-dashboard";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="app-navbar">
      <Link to={dashboardPath} className="brand">
        <span className="brand-icon">S</span>
        SkyShip Express
      </Link>

      <nav>
        {user?.rol === "cliente" && (
          <>
            <NavLink to="/cliente-dashboard">Dashboard</NavLink>
            <NavLink to="/crear-envio">Crear envío</NavLink>
            <NavLink to="/mis-envios">Mis envíos</NavLink>
          </>
        )}

        {user?.rol === "admin" && (
        <>
            <NavLink to="/admin-dashboard">Dashboard</NavLink>
            <NavLink to="/admin-envios">Envíos</NavLink>
            <NavLink to="/admin-usuarios">Usuarios</NavLink>
            <NavLink to="/admin-contactos">Contactos</NavLink>
        </>
        )}

        <span className={`user-pill ${user?.rol === "admin" ? "admin-pill" : ""}`}>
        {user?.nombre || "Usuario"}
        {user?.rol === "admin" && " · Administrador"}
        </span>

        <button onClick={logout} className="btn-outline">
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}

export default AppNavbar;