import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const user = JSON.parse(localStorage.getItem("user"));
const dashboardPath =
  user?.rol === "admin" ? "/admin-dashboard" : "/cliente-dashboard";

function Landing() {
  return (
    <div>
      <Navbar />

      <section className="hero hero-split">
        <div className="hero-content">
          <span className="eyebrow">Logística digital para empresas y personas</span>
          <h1>Envía, rastrea y administra tus paquetes desde una sola plataforma.</h1>
          <p>
            SkyShip Express moderniza la gestión de envíos con solicitudes en línea,
            rastreo de paquetes y atención rápida desde cualquier dispositivo.
          </p>

          <div className="hero-actions">
            <Link className="btn-primary" to="/register">
              Crear cuenta
            </Link>
            <Link className="btn-primary" to={user ? dashboardPath : "/register"}>
  {user ? "Ir a mi dashboard" : "Crear cuenta"}
</Link>
            <Link className="btn-outline" to="/servicios">
              Ver servicios
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80"
            alt="Centro logístico con paquetes"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">¿Por qué elegirnos?</span>
          <h2>Una experiencia de envío más clara y eficiente</h2>
        </div>

        <div className="grid">
          <div className="card">
            <h3>Rastreo claro</h3>
            <p>Consulta el estado de tus paquetes desde tu cuenta.</p>
          </div>

          <div className="card">
            <h3>Costos estimados</h3>
            <p>Calcula el costo de tus envíos antes de solicitarlos.</p>
          </div>

          <div className="card">
            <h3>Panel administrativo</h3>
            <p>La empresa puede gestionar usuarios, envíos y estadísticas.</p>
          </div>

          <div className="card">
            <h3>Atención digital</h3>
            <p>Formulario de contacto y gestión centralizada de solicitudes.</p>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="section-heading">
          <span className="eyebrow">Opiniones</span>
          <h2>Clientes que confían en SkyShip</h2>
        </div>

        <div className="reviews">
          <div className="card review-card">
            <p>“Ahora puedo revisar mis envíos sin llamar a la sucursal.”</p>
            <strong>María López</strong>
            <span>Cliente frecuente</span>
          </div>

          <div className="card review-card">
            <p>“El proceso de solicitud es rápido y fácil de usar.”</p>
            <strong>Carlos Méndez</strong>
            <span>Emprendedor</span>
          </div>

          <div className="card review-card">
            <p>“El dashboard ayuda a controlar mejor las operaciones.”</p>
            <strong>Ana Castillo</strong>
            <span>Administradora</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 SkyShip Express. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Landing;