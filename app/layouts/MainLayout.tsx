import { useState } from "react";
import { Outlet } from "react-router";
import { ModalProvider } from "~/context/ModalContext";
import { BoxesProvider } from "~/context/BoxesContext";
import { VialsProvider } from "~/context/VialsContext";
import ModalRoot from "~/components/modals/ModalRoot";
import Header from "../components/Header";

export default function MainLayout() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <ModalProvider>
      <BoxesProvider>
        <VialsProvider>
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
        </VialsProvider>
      </BoxesProvider>
    </ModalProvider>
  );
}