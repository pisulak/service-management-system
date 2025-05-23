import React from "react";

export default function AuthForm({
  title,
  email,
  setEmail,
  password,
  setPassword,
  error,
  success,
  onSubmit,
  buttonLabel,
  footerText,
  onFooterClick,
}) {
  return (
    <div className="max-w-xs px-5 py-10 text-center rounded-[30px] bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)]">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>

      <form onSubmit={onSubmit}>
        <input
          className="mt-2.5 p-2.5 border-0 rounded-2xl bg-gray-200"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          className="m-2.5 p-2.5 border-0 rounded-2xl bg-gray-200"
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button
          className="mb-8 px-5 py-1.5 cursor-pointer text-gray-400 border border-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 hover:border-gray-700 hover:duration-300"
          type="submit"
        >
          {buttonLabel}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>

      {footerText && (
        <p>
          {footerText}
          <span
            className="ml-1 text-blue-500 cursor-pointer hover:underline hover:text-blue-700"
            onClick={onFooterClick}
          >
            {title === "Login" ? "Zarejestruj się!" : "Zaloguj się!"}
          </span>
        </p>
      )}
    </div>
  );
}
