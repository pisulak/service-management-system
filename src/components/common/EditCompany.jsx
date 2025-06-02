import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditCompany() {
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [nip, setNip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password) {
      setError("Wprowadź hasło w celu weryfikacji");
      return;
    }

    if (!companyName && !address && !nip && !phoneNumber) {
      setError("Wprowadź przynajmniej jedno pole do zmiany");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/updateCompany", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          companyName,
          address,
          nip,
          phoneNumber,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Błąd podczas aktualizacji danych firmy"
        );
      }

      setMessage(data.message || "Firma zaktualizowana pomyślnie");
      setCompanyName("");
      setAddress("");
      setNip("");
      setPhoneNumber("");
      setPassword("");
      navigate(-1);
    } catch (err) {
      setError(err.message || "Błąd sieci lub serwera");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edytuj dane firmy</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      {message && <div className="text-green-600 mb-3">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">
            Nazwa firmy (opcjonalnie)
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Adres (opcjonalnie)</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">NIP (opcjonalnie)</label>
          <input
            type="text"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Numer telefonu (opcjonalnie)
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Hasło (wymagane)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Aktualizowanie..." : "Zapisz zmiany"}
        </button>
      </form>
    </div>
  );
}
