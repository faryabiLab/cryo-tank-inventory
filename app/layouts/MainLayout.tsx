import { useState } from "react";
import type { Tab } from "~/utils/interfaces";
import Header from "../components/Header";
import InventoryPage from "~/pages/Inventory";
import ClassificationPage from "~/pages/Classification";

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("Inventory");

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">
        {activeTab === "Inventory" && <InventoryPage />}
        {activeTab === "Classification" && <ClassificationPage />}
      </main>
    </div>
  );
}