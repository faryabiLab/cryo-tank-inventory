import { NavLink } from "react-router";
import { useAuth } from "~/auth/AuthContext";
import { useBoxes } from "~/context/BoxesContext";
import { useCellLines } from "~/context/CellLinesContext";
import { useModal } from "~/context/ModalContext";
import { useVials } from "~/context/VialsContext";

interface HeaderProps {
  isEditMode: boolean;
  paintMode: boolean;
  paintCellLineId: string;
  setIsEditMode: (value: boolean) => void;
  setPaintMode: (value: boolean) => void;
  setPaintCellLineId: (value: string) => void;
}

export default function Header({
  isEditMode,
  paintMode,
  paintCellLineId,
  setIsEditMode,
  setPaintMode,
  setPaintCellLineId
}: HeaderProps) {
  const { user } = useAuth();
  const { openModal } = useModal();
  const { boxes } = useBoxes();
  const { vials } = useVials();
  const { cellLines } = useCellLines();

  const handleEditMode = () => {
    const newEditMode = !isEditMode;
    setIsEditMode(newEditMode);
    if (!newEditMode) setPaintMode(false); // exit paint mode when edit mode is off
  };

  const handlePaintMode = () => {
    if (!paintMode && !paintCellLineId) {
      setPaintCellLineId(cellLines[0]?.id ?? "");
    }
    setPaintMode(!paintMode);
  };

  const handleLogout = () => {
    openModal("LOGOUT");
  };

  return (
    <div className="sticky top-0 z-10">
      {/* Section 1 - Basic header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 bg-[#080c14] border-b border-[#1e2d47] py-3 px-4 sm:px-6">
        {/* Title */}
        <div className="flex flex-col">
          <p className="text-[#38bdf8] text-[13px] sm:text-[15px] font-bold">❄ CRYO TANK INVENTORY</p>
          <p className="text-[#4a6080] text-[10px] sm:text-[11px] uppercase">{user?.name} LAB · LIQUID NITROGEN STORAGE</p>
        </div>
        <div className="flex flex-row flex-wrap gap-3 sm:gap-5">
          {/* Metrics */}
          <div className="flex flex-row gap-3 sm:gap-5">
            <div className="flex flex-col items-center">
              <p className="text-[#38bdf8] text-[15px] sm:text-[18px] font-bold">{boxes.length.toLocaleString('es-US')}</p>
              <p className="text-[#4a6080] text-[10px]">BOXES</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[#38bdf8] text-[15px] sm:text-[18px] font-bold">{vials.length.toLocaleString('es-US')}</p>
              <p className="text-[#4a6080] text-[10px]">VIALS</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[#38bdf8] text-[15px] sm:text-[18px] font-bold">{cellLines.length.toLocaleString('es-US')}</p>
              <p className="text-[#4a6080] text-[10px]">CELL LINES</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row flex-wrap items-center gap-2">
            {isEditMode && (
              <div className="flex gap-2">
                {paintMode && (
                  <select
                    value={paintCellLineId}
                    onChange={e => setPaintCellLineId(e.target.value)}
                    className="text-[12px] text-[#8da0bb] border border-[#38bdf84d] rounded-sm px-2 py-1.5
                      focus:text-[#dde5f0] focus:border-[#38bdf8] transition duration-300 focus:outline-none bg-[#161f30]"
                  >
                    {cellLines.map(cl => (
                      <option key={cl.id} value={cl.id}>{cl.name}</option>
                    ))}
                  </select>
                )}
                <button
                  onClick={handlePaintMode}
                  className={`flex items-center text-[12px] border rounded-md px-3 sm:px-4 py-1.5 cursor-pointer transition duration-150 whitespace-nowrap
                    ${paintMode
                      ? 'text-[#a78bfa] border-[#a78bfa] bg-[#a78bfa1a] hover:bg-[#a78bfa33]'
                      : 'text-[#8da0bb] border-[#1e2d47] bg-[#161f30] hover:text-[#a78bfa] hover:border-[#a78bfa]'
                    }`}
                >
                  <span className="hidden sm:inline">✦ Paint Mode</span>
                  <span className="sm:hidden">✦</span>
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleEditMode}
            className={`flex items-center text-[#8da0bb] text-[12px] bg-[#161f30] border border-[#1e2d47] 
            px-3 sm:px-4 py-1.5 rounded-md cursor-pointer transition hover:text-[#f59e0b] hover:border-[#f59e0b] duration-150 whitespace-nowrap
            ${isEditMode && "text-[#f59e0b] border-[#f59e0b]"}`}
          >
            <span className="hidden sm:inline">{isEditMode ? "✕ Exit Edit" : "✎ Edit Mode"}</span>
            <span className="sm:hidden">{isEditMode ? "✕" : "✎"}</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center text-[#8da0bb] text-[12px] bg-[#161f30] border border-[#1e2d47] 
            px-3 sm:px-4 py-1.5 rounded-md cursor-pointer transition hover:text-red-400 hover:border-red-400 duration-150 whitespace-nowrap"
          >
            <span className="hidden sm:inline">⏻ Sign out</span>
            <span className="sm:hidden">⏻</span>
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