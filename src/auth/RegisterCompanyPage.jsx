import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterCompanyPage() {
  const [companyName, setCompanyName] = useState("");
  const [nip, setNip] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ companyName, nip, address, phone }),
      });

      if (!res.ok) throw new Error("Błąd podczas tworzenia firmy");

      setSuccess("Firma została zarejestrowana!");
      setTimeout(() => navigate("/clientDashboard"), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rejestracja firmy</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <input
        type="text"
        placeholder="Nazwa firmy"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="NIP"
        value={nip}
        onChange={(e) => setNip(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Adres"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Numer telefonu"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Zarejestruj firmę</button>
    </form>
  );
}
