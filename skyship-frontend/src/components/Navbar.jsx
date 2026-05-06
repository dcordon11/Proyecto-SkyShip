import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const dashboardPath =
    user?.rol === "admin" ? "/admin-dashboard" : "/cliente-dashboard";

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">S</span>
        SkyShip Express
      </Link>

      <nav>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/servicios">Servicios</NavLink>
        <NavLink to="/nosotros">Nosotros</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>

        {!user ? (
          <>
            <NavLink to="/login">Iniciar sesión</NavLink>
            <Link className="btn-primary" to="/register">
              Registrarse
            </Link>
          </>
        ) : (
          <>
            {/* 👉 NUEVO */}
            <NavLink to={dashboardPath}>Dashboard</NavLink>

            <span style={{ fontWeight: 1000, marginRight: "1rem" }}>
              Hola, {user.nombre || "Usuario"}
            </span>

            <button onClick={logout} className="btn-outline">
              Cerrar sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;