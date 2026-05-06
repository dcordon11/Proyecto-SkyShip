import AppNavbar from "../components/AppNavbar";

function AdminUsuarios() {
  return (
    <div>
      <AppNavbar />
      <section className="dashboard-section">
        <h1>Administrar usuarios</h1>
        <p>Aquí se gestionarán los usuarios registrados.</p>
      </section>
    </div>
  );
}

export default AdminUsuarios;