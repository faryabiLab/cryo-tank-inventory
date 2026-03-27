import { useState } from "react";
import { Outlet } from "react-router";
import { ModalProvider } from "~/context/ModalContext";
import ModalRoot from "~/components/modals/modalRoot";
import Header from "../components/Header";

export default function MainLayout() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col">
        <Header
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
        <main className="flex-1">
          <Outlet context={{ isEditMode }} />
        </main>
        <ModalRoot />
      </div>
    </ModalProvider>
  );
}