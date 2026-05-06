import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Servicios from "./pages/Servicios";
import Nosotros from "./pages/Nosotros";
import FAQ from "./pages/FAQ";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClienteDashboard from "./pages/ClienteDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CrearEnvio from "./pages/CrearEnvio";
import MisEnvios from "./pages/MisEnvios";
import AdminEnvios from "./pages/AdminEnvios";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminContactos from "./pages/AdminContactos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/cliente-dashboard"
        element={
          <ProtectedRoute allowedRoles={["cliente"]}>
            <ClienteDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    
      <Route
        path="/crear-envio"
        element={
          <ProtectedRoute allowedRoles={["cliente"]}>
            <CrearEnvio />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mis-envios"
        element={
          <ProtectedRoute allowedRoles={["cliente"]}>
            <MisEnvios />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-envios"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminEnvios />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-usuarios"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUsuarios />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-contactos"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminContactos />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;