import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import TicketsIncoming from "./pages/TicketsIncoming";
import TicketsPlanned from "./pages/TicketsPlanned";
import TicketsDone from "./pages/TicketsDone";
import Storage from "./pages/StorageView";

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
          path="/ticketsIncoming"
          element={
            <PrivateRoute>
              <TicketsIncoming />
            </PrivateRoute>
          }
        />
        <Route
          path="/ticketsPlanned"
          element={
            <PrivateRoute>
              <TicketsPlanned />
            </PrivateRoute>
          }
        />
        <Route
          path="/ticketsDone"
          element={
            <PrivateRoute>
              <TicketsDone />
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

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
