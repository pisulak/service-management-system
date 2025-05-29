import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";

import Login from "../auth/LoginPage.jsx";
import Register from "../auth/RegisterPage.jsx";
import RegisterCompanyPage from "../auth/RegisterCompanyPage.jsx";
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
import ClientAddProtocolPage from "../features/client/protocols/ClientAddProtocolPage.jsx";

function PrivateRoute({ children, allowedRoles }) {
  const user = useAuth();

  if (user === null) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

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
        <Route
          path="/registerCompany"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <RegisterCompanyPage />
            </PrivateRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/pendingProtocols"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <PendingProtocols />
            </PrivateRoute>
          }
        />
        <Route
          path="/scheduledProtocols"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ScheduledProtocols />
            </PrivateRoute>
          }
        />
        <Route
          path="/closedProtocols"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <ClosedProtocols />
            </PrivateRoute>
          }
        />

        <Route
          path="/storage"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Storage />
            </PrivateRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Clients />
            </PrivateRoute>
          }
        />

        {/* Client */}
        <Route
          path="/clientDashboard"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientSubmittedProtocols"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientSubmittedProtocols />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientScheduledProtocols"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientScheduledProtocols />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientClosedProtocols"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientClosedProtocols />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientAddProtocol"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientAddProtocolPage />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
