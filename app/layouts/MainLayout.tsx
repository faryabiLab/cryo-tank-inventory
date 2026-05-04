import { useState } from "react";
import { Outlet } from "react-router";
import { ModalProvider } from "~/context/ModalContext";
import { BoxesProvider } from "~/context/BoxesContext";
import { VialsProvider } from "~/context/VialsContext";
import ModalRoot from "~/components/modals/ModalRoot";
import Header from "../components/Header";
import { CellLinesProvider } from "~/context/CellLinesContext";
import { AuthProvider } from "~/auth/AuthContext";

export default function MainLayout() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <AuthProvider>
      <BoxesProvider>
        <VialsProvider>
          <CellLinesProvider>
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
          </CellLinesProvider>
        </VialsProvider>
      </BoxesProvider>
    </AuthProvider>
  );
}