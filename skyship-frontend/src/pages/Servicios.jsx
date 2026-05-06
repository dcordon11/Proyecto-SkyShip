import Navbar from "../components/Navbar";

function Servicios() {
  return (
    <div>
      <Navbar />

      <section className="page-hero">
        <span className="eyebrow">Nuestros servicios</span>
        <h1>Soluciones de envío para diferentes necesidades</h1>
        <p>
          SkyShip Express ofrece servicios pensados para clientes individuales,
          emprendedores y empresas que necesitan mover paquetes de forma rápida,
          segura y organizada.
        </p>
      </section>

      <section className="section">
        <div className="grid">
          <div className="card">
            <h3>Envíos nacionales</h3>
            <p>Entrega de paquetes dentro del país con seguimiento digital.</p>
          </div>

          <div className="card">
            <h3>Envíos express</h3>
            <p>Servicio prioritario para paquetes urgentes.</p>
          </div>

          <div className="card">
            <h3>Rastreo de paquetes</h3>
            <p>Consulta el estado de cada envío desde la plataforma.</p>
          </div>

          <div className="card">
            <h3>Recolección a domicilio</h3>
            <p>Solicita la recolección de paquetes desde tu ubicación.</p>
          </div>
        </div>
      </section>

      <footer className="footer">© 2026 SkyShip Express</footer>
    </div>
  );
}

export default Servicios;