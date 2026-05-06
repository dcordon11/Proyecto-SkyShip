import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  

  const [form, setForm] = useState({
    correo: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.rol === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/cliente-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };


useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    if (user.rol === "admin") navigate("/admin-dashboard");
    else navigate("/cliente-dashboard");
  }
}, []);


  return (
    <div>
      <Navbar />

      <section className="login-container">
        <div className="login-card">

          <div className="login-header">
            <h2>Bienvenido de nuevo</h2>
            <p>Accede a tu cuenta para gestionar tus envíos</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Correo</label>
              <input
                className="input"
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="correo@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                className="input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button className="btn-primary login-btn">
              Iniciar sesión
            </button>
          </form>

        </div>
      </section>
    </div>
  );
}

export default Login;