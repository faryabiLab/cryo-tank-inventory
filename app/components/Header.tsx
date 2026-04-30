import { NavLink } from "react-router";
import { useBoxes } from "~/context/BoxesContext";
import { useCellLines } from "~/context/CellLinesContext";
import { useVials } from "~/context/VialsContext";

interface HeaderProps {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

export default function Header({
  isEditMode,
  setIsEditMode,
}: HeaderProps) {
  const { boxes } = useBoxes();
  const { vials } = useVials();
  const { cellLines } = useCellLines();

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
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
            <p className="text-[#38bdf8] text-[18px] font-bold">{boxes.length.toLocaleString('es-US')}</p>
            <p className="text-[#4a6080] text-[10px]">BOXES</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[#38bdf8] text-[18px] font-bold">{vials.length.toLocaleString('es-US')}</p>
            <p className="text-[#4a6080] text-[10px]">VIALS</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[#38bdf8] text-[18px] font-bold">{cellLines.length.toLocaleString('es-US')}</p>
            <p className="text-[#4a6080] text-[10px]">CELL LINES</p>
          </div>
          <button
            onClick={handleEditMode}
            className={`flex items-center text-[#8da0bb] text-[12px] bg-[#161f30] border border-[#1e2d47] 
            px-4 rounded-md cursor-pointer transition hover:text-[#f59e0b] hover:border-[#f59e0b] duration-150
            ${isEditMode && "text-[#f59e0b] border-[#f59e0b]"}`}
          >
            {isEditMode ? "✕ Exit Edit" : "✎ Edit Mode"} 
          </button>
        </div>
      </div>
      {/* Section 2 - Tab Navigation */}
      <div className="flex flex-row items-center bg-[#080c14] border-b border-[#1e2d47] pt-3 px-6 gap-6">
        <NavLink
          to="/"
          className={({isActive}) => `border-b-2 pb-2 cursor-pointer
             ${isActive ? "border-[#38bdf8] text-[#38bdf8]" : 
            "border-[#080c14] text-[#8da0bb] hover:text-white"}`}
        >
          <p className="text-[13px]">📦 Inventory</p>
        </NavLink>
        <NavLink
          to="/classification"
          className={({isActive}) => `border-b-2 pb-2 cursor-pointer
            ${isActive ? "border-[#38bdf8] text-[#38bdf8]" : 
            "border-[#080c14] text-[#8da0bb] hover:text-white"}`}
        >
          <p className="text-[13px]">🔬 Cell Line Classification</p>
        </NavLink>
      </div>
    </div>
  )
}