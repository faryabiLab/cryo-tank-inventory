import { Outlet } from "react-router";
import { AuthProvider } from "~/auth/AuthContext";

export default function AuthLayout() {

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}