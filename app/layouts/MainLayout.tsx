import { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";

export default function MainLayout() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
      <main className="flex-1">
        <Outlet context={{ isEditMode }} />
      </main>
    </div>
  );
}