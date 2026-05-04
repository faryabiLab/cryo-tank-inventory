import { useState } from "react";
import { useAuth } from "~/auth/AuthContext";
import { useNavigate } from "react-router";

type Mode = "login" | "register" | "confirm";

export default function Login() {
  const { login, register, confirmRegister, logout } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
        navigate("/");
      } else if (mode === "register") {
        const { nextStep } = await register(email, password, name);
        if (nextStep === "CONFIRM_SIGN_UP") setMode("confirm");
      } else if (mode === "confirm") {
        await confirmRegister(email, code);
        setMode("login");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0f1a]">
      <div className="bg-[#0f1624] border border-[#253552] rounded-xl p-8 w-96">
        <h2 className="text-[#dde5f0] text-lg font-semibold mb-6">
          {mode === "login" ? "Sign in" : mode === "register" ? "Create account" : "Confirm email"}
        </h2>

        <div className="flex flex-col gap-4">
          {mode === "register" && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="text-[12px] text-[#8da0bb] w-full border border-[#38bdf84d] rounded-sm px-2 py-2.5
                focus:text-[#dde5f0] focus:border-[#38bdf8] transition duration-300 focus:outline-none bg-transparent"
            />
          )}

          {mode !== "confirm" && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="text-[12px] text-[#8da0bb] w-full border border-[#38bdf84d] rounded-sm px-2 py-2.5
                  focus:text-[#dde5f0] focus:border-[#38bdf8] transition duration-300 focus:outline-none bg-transparent"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="text-[12px] text-[#8da0bb] w-full border border-[#38bdf84d] rounded-sm px-2 py-2.5
                  focus:text-[#dde5f0] focus:border-[#38bdf8] transition duration-300 focus:outline-none bg-transparent"
              />
            </>
          )}

          {mode === "confirm" && (
            <input
              type="text"
              placeholder="Confirmation code"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="text-[12px] text-[#8da0bb] w-full border border-[#38bdf84d] rounded-sm px-2 py-2.5
                focus:text-[#dde5f0] focus:border-[#38bdf8] transition duration-300 focus:outline-none bg-transparent"
            />
          )}

          {error && <p className="text-red-400 text-[12px]">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#34d3991a] text-[#34d399] text-[13px] font-medium border border-[#34d3994d] rounded-md px-4 py-2
              hover:border-[#34d399] hover:bg-[#34d39933] transition duration-150 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Loading..." : mode === "login" ? "Sign in" : mode === "register" ? "Register" : "Confirm"}
          </button>

          {mode === "login" && (
            <p className="text-[#4a6080] text-[12px] text-center">
              No account?{" "}
              <button onClick={() => setMode("register")} className="text-[#38bdf8] hover:underline cursor-pointer">
                Register
              </button>
            </p>
          )}

          {mode === "register" && (
            <p className="text-[#4a6080] text-[12px] text-center">
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="text-[#38bdf8] hover:underline cursor-pointer">
                Sign in
              </button>
            </p>
          )}

          <button onClick={logout}>Sign out</button>
        </div>
      </div>
    </div>
  );
}