import AuthForm from "./AuthForm";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword, error, handleLogin } =
    useLogin();

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <AuthForm
        title="Login"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        success=""
        onSubmit={handleLogin}
        buttonLabel="Zaloguj się"
        footerText="Nie masz konta?"
        onFooterClick={() => navigate("/register")}
      />
    </div>
  );
}
