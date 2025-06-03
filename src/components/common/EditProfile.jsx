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

  function handleBackButton() {
    navigate(-1);
  }

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
    <div>
      <button
        className="absolute top-16 left-20 mb-8 px-5 py-1.5 cursor-pointer bg-white text-gray-600 border border-gray-600 rounded-xl hover:bg-gray-100 hover:text-gray-800 hover:border-gray-900 hover:duration-300"
        onClick={handleBackButton}
      >
        Cofnij
      </button>

      <div className="mt-32 flex justify-center">
        {error && <div className="text-red-600 mb-3">{error}</div>}
        {message && <div className="text-green-600 mb-3">{message}</div>}
        <form
          onSubmit={handleSubmit}
          className="fixed grid grid-cols-1 w-1/3 px-5 py-10 text-center rounded-[30px] bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)]"
        >
          <h2 className="mb-4 text-3xl font-bold">Edytuj dane konta</h2>
          <input
            className="w-2/3 justify-self-center mt-2.5 p-2.5 border-0 rounded-xl bg-gray-200"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="nowy@email.com"
          />

          <input
            className="w-2/3 justify-self-center mt-2.5 p-2.5 border-0 rounded-xl bg-gray-200"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nowe hasło"
          />

          <input
            className="w-2/3 justify-self-center mt-2.5 p-2.5 border-0 rounded-xl bg-gray-200"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Stare hasło - wymagane"
            required
          />

          <button
            type="submit"
            className="justify-self-center w-1/3 mt-6 px-5 py-1.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
            disabled={loading}
          >
            Zapisz zmiany
          </button>
        </form>
      </div>
    </div>
  );
}
