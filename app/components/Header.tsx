import type { Tab } from "~/utils/interfaces";
import { boxData, vialData, cellData } from "~/utils/data";

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
}: HeaderProps) {

  const handleEditMode = () => {
    console.log("Edit mode");
  };

  return (
    <div className="sticky top-0">
      {/* Section 1 - Basic header */}
      <div className="flex flex-row justify-between items-center bg-[#080c14] border-b border-[#1e2d47] py-3 px-6">
        {/* Title */}
        <div className="flex flex-col">
          <p className="text-[#38bdf8] text-[15px] font-bold">❄ CRYO TANK INVENTORY</p>
          <p className="text-[#4a6080] text-[11px]">ALEX LAB · LIQUID NITROGEN STORAGE</p>
        </div>
        {/* Metrics */}
        <div className="flex flex-row gap-5">
          <div className="flex flex-col items-center">
            <p className="text-[#38bdf8] text-[18px] font-bold">{boxData.length.toLocaleString('es-US')}</p>
            <p className="text-[#4a6080] text-[10px]">BOXES</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[#38bdf8] text-[18px] font-bold">{vialData.length.toLocaleString('es-US')}</p>
            <p className="text-[#4a6080] text-[10px]">VIALS</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[#38bdf8] text-[18px] font-bold">{cellData.length.toLocaleString('es-US')}</p>
            <p className="text-[#4a6080] text-[10px]">CELL LINES</p>
          </div>
          <button
            onClick={handleEditMode}
            className="flex items-center text-[#8da0bb] text-[12px] bg-[#161f30] border border-[#1e2d47] 
            px-4 rounded-md cursor-pointer transition hover:text-[#f59e0b] hover:border-[#f59e0b] duration-150"
          >
            ✎ Edit Mode
          </button>
        </div>
      </div>
      {/* Section 2 - Tab Navigation */}
      <div className="flex flex-row items-center bg-[#080c14] border-b border-[#1e2d47] pt-3 px-6 gap-6">
        <button
          className={`border-b-2 pb-2 cursor-pointer
            ${activeTab === "Inventory" ? "border-[#38bdf8] text-[#38bdf8]" : 
            "border-[#080c14] text-[#8da0bb] hover:text-white"}`}
          onClick={() => setActiveTab("Inventory")}
        >
          <p className="text-[13px]">📦 Inventory</p>
        </button>
        <button
          className={`border-b-2 pb-2 cursor-pointer
            ${activeTab === "Classification" ? "border-[#38bdf8] text-[#38bdf8]" : 
            "border-[#080c14] text-[#8da0bb] hover:text-white"}`}
          onClick={() => setActiveTab("Classification")}
        >
          <p className="text-[13px]">🔬 Cell Line Classification</p>
        </button>
      </div>
    </div>
  )
}