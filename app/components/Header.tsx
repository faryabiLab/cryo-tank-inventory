export const Header = () => {

  const handleEditMode = () => {
    console.log("Edit mode");
  };

  return (
    <div className="flex flex-row justify-between items-center bg-[#080c14] border-b border-[#1e2d47] py-3 px-6">
      {/* Left side */}
      <div className="flex flex-col">
        <p className="text-[#38bdf8] text-[15px] font-bold">❄ CRYO TANK INVENTORY</p>
        <p className="text-[#4a6080] text-[11px]">ALEX LAB · LIQUID NITROGEN STORAGE</p>
      </div>
      {/* Right side */}
      <div className="flex flex-row gap-5">
        <div className="flex flex-col items-center">
          <p className="text-[#38bdf8] text-[18px] font-bold">40</p>
          <p className="text-[#4a6080] text-[10px]">BOXES</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#38bdf8] text-[18px] font-bold">2,326</p>
          <p className="text-[#4a6080] text-[10px]">VIALS</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[#38bdf8] text-[18px] font-bold">40</p>
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
  )
}