import { boxData, cellData, vialData } from "~/utils/data";
import { buildBoxGrid } from "~/utils/gridHelpers";
import type { BoxGrid, CellLinesById, IBox, IVial } from "~/utils/interfaces";

// Single Box Component
const BoxItem: React.FC<{box: IBox}> = ({box}) => {
  const totalCells = box.rows * box.columns;

  const boxVials = vialData.filter((v: IVial) => v.boxId === box.id);
  const cellLineMap: CellLinesById = Object.fromEntries(
    cellData.map((cell) => [cell.id, cell])
  );

  const boxGrid: BoxGrid =  buildBoxGrid(box, boxVials, cellLineMap);

  return (
    <div className={`bg-[#0f1624] border ${box.essential ? "border-[#f59e0b40] hover:border-[#f59e0b73]" : 
    "border-[#253552]"} w-1/3 aspect-square rounded-lg transition duration-150`}>
      {/* Header */}
      <div className="flex flex-row gap-2 items-center bg-[#161f30] px-3 py-2 border-b border-[#1e2d47]">
        <div className={`${box.essential ? 'bg-[#f59e0b1f] text-[#f59e0b]' : 'bg-[#38bdf81a] text-[#38bdf8]'} 
        text-[10px] flex justify-center items-center px-1.5 rounded-md`}>
          {box.essential ? "Essential Box" : 'Box'}
        </div>
        <p className="text-[12px] text-[#dde5f0]">{box.name}</p>
        <p className="text-[11px] text-[#4a6080] ml-auto">{boxVials.length}/{totalCells}</p>
      </div>
      {/* Filled bar */}
      <div>

      </div>
      {/* Box grid */}
      <div className="p-2">
        {/* Column headers */}
        <div className="grid grid-cols-9 h-full w-full">
          {Array.from({length: box.columns},(_,index) => 
            <p key={`header-${index}-${box.id}`} className="text-[8px] text-[#4a6080] text-center">{index+1}</p>
          )}
        </div>
        {/* Vials container */}
        <div className="grid grid-cols-9 h-full w-full">
          {boxGrid.map((row, i) => (
            <div key={i}>
              {row.map((cell, j) => (
                <div
                  key={j}
                  className={`aspect-square rounded-sm border border-[#0f1929] transition 
                  ${cell.cellLine && 'hover:scale-110'} duration-150`}
                  style={{
                    backgroundColor: cell.cellLine?.color ?? "#0b1220",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const InventoryPage = () => {
  return (
    <main className="flex items-center justify-center bg-[#080c14]">
      {/* Boxes Container */}
      <div className="flex flex-row flex-wrap gap-8 w-full p-6">
        {boxData.map((box: IBox) => <BoxItem key={box.id} box={box} />)}
      </div>
    </main>
  );
}

export default InventoryPage;