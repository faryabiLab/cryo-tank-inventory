import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "~/auth/AuthContext";
import { ModalProvider } from "~/context/ModalContext";
import Header from "~/components/Header";
import ModalRoot from "~/components/modals/ModalRoot";
import { useCellLines } from "~/context/CellLinesContext";

export default function MainLayout() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { cellLines } = useCellLines();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [paintMode, setPaintMode] = useState<boolean>(false);
  const [paintCellLineId, setPaintCellLineId] = useState<string>(cellLines?.[0]?.id || "");

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
          paintMode={paintMode}
          paintCellLineId={paintCellLineId}
          setIsEditMode={setIsEditMode}
          setPaintMode={setPaintMode}
          setPaintCellLineId={setPaintCellLineId}
        />
        <main className="flex-1">
          <Outlet 
            context={{ 
              isEditMode,
              paintMode,
              paintCellLineId
            }}
          />
        </main>
        <ModalRoot />
      </div>
    </ModalProvider>
  );
}