import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "~/auth/AuthContext";

export default function AuthLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading]);

  if (loading || user) return null;

  return <Outlet />;
}