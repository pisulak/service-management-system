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
    <div className="flex justify-center items-center h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="max-w-xs px-5 py-10 text-center rounded-[30px] bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)]"
      >
        <h1 className="mb-4 text-3xl font-bold">Rejestracja firmy</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <input
          className="mt-2.5 p-2.5 border-0 rounded-2xl bg-gray-200"
          type="text"
          placeholder="Nazwa firmy"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <input
          className="mt-2.5 p-2.5 border-0 rounded-2xl bg-gray-200"
          type="text"
          placeholder="NIP"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
          required
        />
        <input
          className="mt-2.5 p-2.5 border-0 rounded-2xl bg-gray-200"
          type="text"
          placeholder="Adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          className="m-2.5 p-2.5 border-0 rounded-2xl bg-gray-200"
          type="text"
          placeholder="Numer telefonu"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button
          className="mb-8 px-5 py-1.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
          type="submit"
        >
          Zpisz dane firmy
        </button>
      </form>
    </div>
  );
}
