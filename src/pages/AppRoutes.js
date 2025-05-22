import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "../auth/LoginPage.jsx";
import Register from "../auth/RegisterPage.jsx";
import NotFound from "./NotFound.jsx";

// Admin pages
import Dashboard from "../features/admin/dashboard/DashboardPage.jsx";
import IncomingProtocols from "../features/admin/protocols/IncomingProtocols.jsx";
import PlannedProtocols from "../features/admin/protocols/PlannedProtocols.jsx";
import DoneProtocols from "../features/admin/protocols/DoneProtocols.jsx";
import Storage from "../features/admin/storage/StoragePage.jsx";
import Clients from "../features/admin/clients/ClientsPage.jsx";

// Client pages

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Publiczne trasy */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Chronione trasy */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/incomingProtocols"
          element={
            <PrivateRoute>
              <IncomingProtocols />
            </PrivateRoute>
          }
        />
        <Route
          path="/plannedProtocols"
          element={
            <PrivateRoute>
              <PlannedProtocols />
            </PrivateRoute>
          }
        />
        <Route
          path="/doneProtocols"
          element={
            <PrivateRoute>
              <DoneProtocols />
            </PrivateRoute>
          }
        />

        <Route
          path="/storage"
          element={
            <PrivateRoute>
              <Storage />
            </PrivateRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
