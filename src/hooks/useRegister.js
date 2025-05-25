import { useState } from "react";
import { registerUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await registerUser(email, password);
      const userId = response.user.id;

      setSuccess("Rejestracja zakończona sukcesem!");

      setTimeout(() => navigate(`/registerCompany?userId=${userId}`), 1500);
    } catch (err) {
      setError(err.message || "Błąd przy rejestracji");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    handleRegister,
  };
}
