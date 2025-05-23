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
import PendingProtocols from "../features/admin/protocols/PendingProtocols.jsx";
import ScheduledProtocols from "../features/admin/protocols/ScheduledProtocols.jsx";
import ClosedProtocols from "../features/admin/protocols/ClosedProtocols.jsx";
import Storage from "../features/admin/storage/StoragePage.jsx";
import Clients from "../features/admin/clients/ClientsPage.jsx";

// Client pages
import ClientDashboard from "../features/client/dashboard/ClientDashboardPage.jsx";
import ClientSubmittedProtocols from "../features/client/protocols/ClientSubmittedProtocols.jsx";
import ClientScheduledProtocols from "../features/client/protocols/ClientScheduledProtocols.jsx";
import ClientClosedProtocols from "../features/client/protocols/ClientClosedProtocols.jsx";

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

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Publiczne trasy */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Chronione trasy */}

        {/* Admin */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/pendingProtocols"
          element={
            <PrivateRoute>
              <PendingProtocols />
            </PrivateRoute>
          }
        />
        <Route
          path="/scheduledProtocols"
          element={
            <PrivateRoute>
              <ScheduledProtocols />
            </PrivateRoute>
          }
        />
        <Route
          path="/closedProtocols"
          element={
            <PrivateRoute>
              <ClosedProtocols />
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

        {/* Client */}
        <Route
          path="/clientDashboard"
          element={
            <PrivateRoute>
              <ClientDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientSubmittedProtocols"
          element={
            <PrivateRoute>
              <ClientSubmittedProtocols />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientScheduledProtocols"
          element={
            <PrivateRoute>
              <ClientScheduledProtocols />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientClosedProtocols"
          element={
            <PrivateRoute>
              <ClientClosedProtocols />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
