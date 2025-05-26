import { useState } from "react";
import { loginUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);

      const role = data.user?.role;

      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "client") {
        navigate("/clientDashboard");
      } else {
        setError("Nieznana rola użytkownika");
      }
    } catch (err) {
      setError(err.message || "Błąd przy logowaniu");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
}
