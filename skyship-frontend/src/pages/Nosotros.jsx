import Navbar from "../components/Navbar";

function Nosotros() {
  return (
    <div>
      <Navbar />

      <section className="page-hero">
        <span className="eyebrow">Sobre nosotros</span>
        <h1>Una empresa logística enfocada en la experiencia digital</h1>
        <p>
          SkyShip Express nace con el objetivo de modernizar la forma en que los
          clientes solicitan, administran y rastrean sus envíos.
        </p>
      </section>

      <section className="section">
        <div className="two-columns">
          <div className="card">
            <h3>Misión</h3>
            <p>
              Brindar soluciones de paquetería rápidas, seguras y accesibles,
              apoyadas en tecnología web moderna.
            </p>
          </div>

          <div className="card">
            <h3>Visión</h3>
            <p>
              Ser una empresa líder en servicios logísticos digitales,
              reconocida por su eficiencia y confiabilidad.
            </p>
          </div>

          <div className="card">
            <h3>Valores</h3>
            <p>
              Seguridad, puntualidad, innovación, transparencia, confianza y
              servicio al cliente.
            </p>
          </div>

          <div className="card">
            <h3>Historia</h3>
            <p>
              La empresa inició atendiendo solicitudes por teléfono, WhatsApp y
              sucursales. Ahora busca centralizar su operación mediante una
              plataforma web.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">© 2026 SkyShip Express</footer>
    </div>
  );
}

export default Nosotros;