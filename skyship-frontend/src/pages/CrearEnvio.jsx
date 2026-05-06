import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import api from "../api/axios";

function CrearEnvio() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    origen: "",
    destino: "",
    direccion_entrega: "",
    region: "misma_ciudad",
    peso: "",
    tipo_paquete: "Caja pequeña",
    metodo_entrega: "estandar",
    recoleccion: false,
    seguro: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

const calcularCotizacion = () => {
  const peso = Number(form.peso) || 0;

  const costoBase = 25;
  const costoPeso = peso * 8;

  let costoDistancia = 0;
  let tiempoEstimado = "24 a 48 horas";

  if (form.region === "misma_ciudad") {
    costoDistancia = 10;
    tiempoEstimado = form.metodo_entrega === "express" ? "6 a 12 horas" : "24 a 48 horas";
  } else if (form.region === "otro_departamento") {
    costoDistancia = 35;
    tiempoEstimado = "2 a 4 días";
  } else if (form.region === "internacional") {
    costoDistancia = 150;
    tiempoEstimado = "5 a 10 días";
  }

  const costoServicio =
    form.metodo_entrega === "express" && form.region === "misma_ciudad" ? 30 : 0;

  const costoRecoleccion = form.recoleccion ? 20 : 0;
  const costoSeguro = form.seguro ? 25 : 0;

  const total =
    costoBase +
    costoPeso +
    costoDistancia +
    costoServicio +
    costoRecoleccion +
    costoSeguro;

  return {
    costoBase,
    costoPeso,
    costoDistancia,
    costoServicio,
    costoRecoleccion,
    costoSeguro,
    total,
    tiempoEstimado,
  };
};

const cotizacion = calcularCotizacion();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "region" && value !== "misma_ciudad") {
      updatedForm.metodo_entrega = "estandar";
    }

    setForm(updatedForm);
  };

  const validarFormulario = () => {
    if (!form.origen.trim()) return "El origen es obligatorio";
    if (!form.destino.trim()) return "El destino es obligatorio";
    if (!form.peso || Number(form.peso) <= 0) return "El peso debe ser mayor a 0";
    if (Number(form.peso) > 100) return "El peso no puede ser mayor a 100 lb";
    if (!form.region) return "Debes seleccionar el tipo de destino";
    if (!form.metodo_entrega) return "Debes seleccionar el nivel de servicio";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validarFormulario();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await api.post("/envios", {
        origen: form.origen,
        destino: form.destino,
        direccion_entrega: form.direccion_entrega,
        region: form.region,
        peso: Number(form.peso),
        tipo_paquete: form.tipo_paquete,
        metodo_entrega: form.metodo_entrega,
        recoleccion: form.recoleccion,
        seguro: form.seguro,
        costo_estimado: cotizacion.total,
        tiempo_estimado: cotizacion.tiempoEstimado,
      });

      setSuccess("Envío creado correctamente");

      setTimeout(() => {
        navigate("/cliente-dashboard");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el envío");
    }
  };

  return (
    <div>
      <AppNavbar />

      <section className="dashboard-section">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Cotizador de envíos</span>
            <h1>Crear solicitud de envío</h1>
            <p>Completa los datos para calcular el costo estimado del envío.</p>
          </div>
        </div>

        <div className="form-layout">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Origen</label>
                <input
                  className="input"
                  type="text"
                  name="origen"
                  value={form.origen}
                  onChange={handleChange}
                  placeholder="Ej: Ciudad de Guatemala"
                />
              </div>

              <div className="form-group">
                <label>Destino</label>
                <input
                  className="input"
                  type="text"
                  name="destino"
                  value={form.destino}
                  onChange={handleChange}
                  placeholder="Ej: Quetzaltenango"
                />
              </div>

              <div className="form-group">
                <label>Dirección exacta de entrega</label>
                <textarea
                  className="input"
                  rows="3"
                  name="direccion_entrega"
                  value={form.direccion_entrega}
                  onChange={handleChange}
                  placeholder="Ej: Zona 10, 5ta avenida, edificio o referencia"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Tipo de destino</label>
                <select
                  className="input"
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                >
                  <option value="misma_ciudad">Misma ciudad</option>
                  <option value="otro_departamento">Otro departamento</option>
                  <option value="internacional">Internacional</option>
                </select>
              </div>

              <div className="form-group">
                <label>Peso en libras</label>
                <input
                  className="input"
                  type="number"
                  step="0.1"
                  name="peso"
                  value={form.peso}
                  onChange={handleChange}
                  placeholder="Ej: 5"
                />
              </div>

              <div className="form-group">
                <label>Tipo de paquete</label>
                <select
                  className="input"
                  name="tipo_paquete"
                  value={form.tipo_paquete}
                  onChange={handleChange}
                >
                  <option value="Documento">Documento</option>
                  <option value="Caja pequeña">Caja pequeña</option>
                  <option value="Caja mediana">Caja mediana</option>
                  <option value="Caja grande">Caja grande</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label>Nivel de servicio</label>
                <select
                  className="input"
                  name="metodo_entrega"
                  value={form.metodo_entrega}
                  onChange={handleChange}
                >
                  <option value="estandar">Estándar</option>
                  <option value="express" disabled={form.region !== "misma_ciudad"}>
                    Exprés {form.region !== "misma_ciudad" ? "(solo misma ciudad)" : ""}
                  </option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="recoleccion"
                    checked={form.recoleccion}
                    onChange={handleChange}
                  />
                  Recolección a domicilio
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="seguro"
                    checked={form.seguro}
                    onChange={handleChange}
                  />
                  Seguro contra pérdida y accidentes
                </label>
              </div>

              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}

              <button className="btn-primary">Crear envío</button>
            </form>
          </div>

          <div className="card">
            <h2>Resumen de cotización</h2>

            <div className="summary-item">
              <span>Costo base:</span>
              <strong>Q{cotizacion.costoBase.toFixed(2)}</strong>
            </div>

            <div className="summary-item">
              <span>Costo por peso:</span>
              <strong>Q{cotizacion.costoPeso.toFixed(2)}</strong>
            </div>

            <div className="summary-item">
              <span>Costo por distancia:</span>
              <strong>Q{cotizacion.costoDistancia.toFixed(2)}</strong>
            </div>

            <div className="summary-item">
              <span>Servicio exprés:</span>
              <strong>Q{cotizacion.costoServicio.toFixed(2)}</strong>
            </div>

            <div className="summary-item">
              <span>Recolección:</span>
              <strong>Q{cotizacion.costoRecoleccion.toFixed(2)}</strong>
            </div>

            <div className="summary-item">
              <span>Seguro:</span>
              <strong>Q{cotizacion.costoSeguro.toFixed(2)}</strong>
            </div>

            <hr />

            <div className="summary-item total">
              <span>Total estimado:</span>
              <strong>Q{cotizacion.total.toFixed(2)}</strong>
            </div>

            <div className="summary-item">
              <span>Tiempo estimado:</span>
              <strong>{cotizacion.tiempoEstimado}</strong>
            </div>

            <p style={{ color: "#6b7280" }}>
              El costo mostrado es estimado y puede variar según condiciones del servicio.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CrearEnvio;