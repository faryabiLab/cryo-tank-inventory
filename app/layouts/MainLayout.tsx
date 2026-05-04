import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "~/auth/AuthContext";
import { ModalProvider } from "~/context/ModalContext";
import Header from "~/components/Header";
import ModalRoot from "~/components/modals/ModalRoot";

export default function MainLayout() {
  const { user, loading } = useAuth();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading]);

  if (loading || !user) return null;

  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col">
        <Header
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
        <main className="flex-1">
          <Outlet 
            context={{ 
              isEditMode,
            }}
          />
        </main>
        <ModalRoot />
      </div>
    </ModalProvider>
  );
}