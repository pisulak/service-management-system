import AuthForm from "../components/auth/Form";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    handleRegister,
  } = useRegister();

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <AuthForm
        title="Register"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        success={success}
        onSubmit={handleRegister}
        buttonLabel="Zarejestruj się"
        footerText="Masz już konto?"
        onFooterClick={() => navigate("/login")}
      />
    </div>
  );
}
