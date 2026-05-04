import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signIn, signOut, signUp, confirmSignUp, fetchUserAttributes } from "aws-amplify/auth";

type AuthUser = {
  userId: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<{ nextStep: string }>;
  confirmRegister: (email: string, code: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if a session already exists on mount
  useEffect(() => {
    loadUser()
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const loadUser = async () => {
    const cognitoUser = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    setUser({
      userId: cognitoUser.userId,
      email: attributes.email ?? "",
      name: attributes.name ?? "",
    });
  };

  const login = async (email: string, password: string) => {
    const { isSignedIn } = await signIn({ username: email, password });
    if (isSignedIn) await loadUser();
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  const register = async (email: string, password: string, name: string) => {
    const { nextStep } = await signUp({ username: email, password, options: { userAttributes: { email, name } } });
    return { nextStep: nextStep.signUpStep };
  };

  const confirmRegister = async (email: string, code: string) => {
    await confirmSignUp({ username: email, confirmationCode: code });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, confirmRegister }}>
      {children}
    </AuthContext.Provider>
  );
}