import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import api from "../api/axios";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const obtenerDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");

        if (isMounted) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Error al obtener dashboard:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    obtenerDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div>
        <AppNavbar />
        <section className="dashboard-section">
          <p>Cargando dashboard...</p>
        </section>
      </div>
    );
  }

  const formatearTexto = (texto) => {
    if (!texto) return "";

    return texto
      .replaceAll("_", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const COLORS = [
  "#facc15",
  "#0f172a",
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#9333ea",
];

  return (
    <div>
      <AppNavbar />

      <section className="dashboard-section">
        <div className="dashboard-header">
          <div>
            <span className="eyebrow">Panel administrativo</span>
            <h1>Dashboard general</h1>
            <p>Resumen operativo de usuarios, envíos e ingresos estimados.</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Usuarios</span>
            <strong>{data?.totalUsuarios || 0}</strong>
          </div>

          <div className="stat-card">
            <span>Total envíos</span>
            <strong>{data?.totalEnvios || 0}</strong>
          </div>

          <div className="stat-card">
            <span>Ingresos estimados</span>
            <strong>Q{Number(data?.ingresosEstimados || 0).toFixed(2)}</strong>
          </div>

          <div className="stat-card">
            <span>Estados registrados</span>
            <strong>{data?.enviosPorEstado?.length || 0}</strong>
          </div>
        </div>

        <div className="admin-dashboard-grid">
          <div className="card">
            <h2>Envíos por estado</h2>

            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data?.enviosPorEstado || []}
                    dataKey="total"
                    nameKey="estado"
                    outerRadius={110}
                    label={({ estado }) => formatearTexto(estado)}
                  >
                    {(data?.enviosPorEstado || []).map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h2>Envíos por región</h2>

            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={data?.enviosPorRegion || []}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="region"
                    tickFormatter={formatearTexto}
                  />

                  <YAxis />

                  <Tooltip
                    formatter={(value) => [value, "Envíos"]}
                    labelFormatter={(label) =>
                      formatearTexto(label)
                    }
                  />

                  <Bar dataKey="total" fill="#facc15" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;