import Navbar from "../components/Navbar";

function FAQ() {
  return (
    <div>
      <Navbar />

      <section className="page-hero">
        <span className="eyebrow">Preguntas frecuentes</span>
        <h1>Resolvemos tus dudas principales</h1>
        <p>
          Encuentra información rápida sobre envíos, rastreo, costos y
          funcionamiento de la plataforma.
        </p>
      </section>

      <section className="section">
        <div className="two-columns">
          <div className="card">
            <h3>¿Cómo puedo rastrear mi paquete?</h3>
            <p>Desde tu cuenta, entrando a la sección “Mis envíos”.</p>
          </div>

          <div className="card">
            <h3>¿Puedo solicitar envíos express?</h3>
            <p>Sí, puedes elegir el método express al crear una solicitud.</p>
          </div>

          <div className="card">
            <h3>¿El costo se calcula automáticamente?</h3>
            <p>
              Sí, el sistema genera un costo estimado según el peso y el tipo de
              entrega.
            </p>
          </div>

          <div className="card">
            <h3>¿Necesito una cuenta?</h3>
            <p>
              Sí, para crear envíos y consultar tu historial necesitas iniciar
              sesión.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">© 2026 SkyShip Express</footer>
    </div>
  );
}

export default FAQ;