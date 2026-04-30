import { useState } from "react";
import { useCellLines } from "~/context/CellLinesContext";
import { useVials } from "~/context/VialsContext";
import { getCoordinate } from "~/utils/helpers";
import type { ICellLine } from "~/utils/interfaces";

export default function AddVialModal({ data, onClose }: { data?: any; onClose: () => void }) {
  const { cellLines } = useCellLines();
  const [nameValue, setNameValue] = useState<string>("");
  const [cellIdValue, setCellIdValue] = useState<string>("");

  const coordinate: string = getCoordinate(Number(data.row), Number(data.column)) || "";
  const selectorOptions: ICellLine[] = cellLines.filter((cell) => cell.userId === data.userId);

  const { addVial } = useVials();

  const handleCreateVial = () => {
    addVial({
      name: nameValue,
      boxId: data.boxId,
      userId: data.userId,
      row: Number(data.row),
      column: Number(data.column),
      cellLineId: cellIdValue || selectorOptions[0].id || "", // Replace by selector
    })

    onClose();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };

  const handleCellChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCellIdValue(event.target.value);
  };

  return (
    <div className="bg-[#0f1624] rounded-xl w-105 max-w-[95vw] border border-[#253552]">
      {/* Header */}
      <div className="flex flex-row justify-between items-center px-4 py-3 border-b border-[#1e2d47] rounded-t-md">
        <h3 className="text-[#dde5f0] text-[14px] font-semibold">Add vial at {coordinate}</h3>
        <button
          className="text-[#4a6080] text-[18px] mr-2 cursor-pointer hover:text-[#dde5f0] transition duration-150"
          onClick={onClose}
        >x</button>
      </div>
      {/* Sub-Header */}
      <div className="flex flex-row flex-wrap gap-3 text-[#4a6080] text-[11px] px-4 pt-4">
        <p>Box: <span className="text-[#38bdf8]">{data.boxName || ""}</span></p>
        <p>·</p>
        <p>Position: <span className="text-[#38bdf8]">{coordinate}</span></p>
      </div>
      {/* Form */}
      <div className="flex flex-col gap-4 p-4 border-b border-[#1e2d47]">
        <div className="flex flex-col gap-1">
          <label className="text-[12px] text-[#4a6080] uppercase">Vial Name</label>
          <input 
            type="text"
            placeholder="Write vial name"
            className="text-[12px] text-[#8da0bb] w-full border border-[#38bdf84d] rounded-sm px-2 py-2.5
              focus:text-[#dde5f0] focus:border focus:border-[#38bdf8] transition duration-300 focus:outline-none"
            value={nameValue}
            onChange={handleNameChange}
          />
        </div>
        {/* Cell Line Selector */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <label className="text-[12px] text-[#4a6080] uppercase">Cell Line</label>
            <div className="aspect-square h-2 rounded-xs" 
              style={{
                backgroundColor: data.cellLineMap[cellIdValue || selectorOptions[0].id]?.color || 'white'
              }} 
            />
          </div>
          <select
            className="text-[12px] text-[#8da0bb] w-full border border-[#38bdf84d] rounded-sm px-2 py-2.5
            focus:text-[#dde5f0] focus:border focus:border-[#38bdf8] transition duration-300 focus:outline-none"
            onChange={handleCellChange}
          >
            {selectorOptions.map((cell) => 
              <option key={cell.id} value={cell.id}>
                {cell.name}
              </option>
            )}
          </select>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-row justify-end gap-2 p-4">
        <button
          className="bg-[#161f30] text-[#8da0bb] text-[13px] border border-[#1e2d47] rounded-md px-4 py-1.5
          hover:text-[#dde5f0] hover:border-[#253552] transition duration-150 cursor-pointer"
          onClick={onClose}
        >Cancel</button>
        <button
          className="bg-[#34d3991a] text-[#34d399] text-[13px] font-medium border border-[#34d3994d] rounded-md px-4 py-1.5
          hover:border-[#34d399] hover:bg-[#34d39933] transition duration-150 cursor-pointer"
          onClick={handleCreateVial}
        >Add vial</button>
      </div>
    </div>
  );
}