import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!oldPassword) {
      setError("Wprowadź stare hasło w celu weryfikacji");
      return;
    }

    if (!newEmail && !newPassword) {
      setError("Podaj nowy e-mail i/lub nowe hasło");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ newEmail, oldPassword, newPassword }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Nieprawidłowa odpowiedź z serwera");
      }

      if (!res.ok) {
        throw new Error(data.message || "Błąd podczas aktualizacji danych");
      }

      setMessage(data.message || "Dane zaktualizowane pomyślnie");
      setNewEmail("");
      setOldPassword("");
      setNewPassword("");
      navigate(-1);
    } catch (err) {
      setError(err.message || "Błąd sieci lub serwera");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edytuj dane konta</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      {message && <div className="text-green-600 mb-3">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">
            Nowy e-mail (opcjonalnie)
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="nowy@email.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Stare hasło (wymagane)
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Nowe hasło (opcjonalnie)
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Minimum 8 znaków"
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
