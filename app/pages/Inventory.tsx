import { boxData, cellData, vialData } from "~/utils/data";
import { buildBoxGrid } from "~/utils/helpers";
import type { BoxGrid, CellLinesById, IBox, IVial } from "~/utils/interfaces";

// Single Box Component
const BoxItem: React.FC<{box: IBox, cellLineMap: CellLinesById}> = ({box, cellLineMap}) => {
  const totalCells = box.rows * box.columns;

  const boxVials = vialData.filter((v: IVial) => v.boxId === box.id);
  const boxGrid: BoxGrid =  buildBoxGrid(box, boxVials, cellLineMap);

  return (
    <div className={`bg-[#0f1624] border ${box.essential ? "border-[#f59e0b40] hover:border-[#f59e0b73]" : 
    "border-[#253552]"} rounded-lg transition duration-150`}>
      {/* Header */}
      <div className="flex flex-row gap-2 items-center bg-[#161f30] px-3 py-2 border-b border-[#1e2d47] rounded-t-md">
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
                  className={`aspect-square rounded-sm border m-px border-[#0f1929] transition 
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

const ControlMenu: React.FC = () => {
  return (
    <div className="flex flex-row items-center flex-wrap gap-10 bg-[#0f1624b3] border-b border-[#1e2d47] py-3 px-6">
      asd
    </div>
  );
}

const ColorKey: React.FC<{cellLineMap: CellLinesById}> = ({cellLineMap}) => {
  return (
    <div className="flex flex-row items-center flex-wrap gap-3 border-b border-[#1e2d47] py-3 px-6">
      <p className="text-[10px] text-[#4a6080] uppercase">Color Key:</p>
      {Object.entries(cellLineMap).map(([id, cell]) => 
        <div key={`color-map-${id}`} className="flex flex-row items-center gap-1">
          <div className="aspect-square h-2 rounded-xs" style={{backgroundColor: cell.color || 'white'}} />
          <p className="text-[10px] text-[#8da0bb]">{cell.name}</p>
        </div>
      )}
    </div>
  );
}

const InventoryPage = () => {
  const cellLineMap: CellLinesById = Object.fromEntries(
    cellData.map((cell) => [cell.id, cell])
  );

  return (
    <main className="flex flex-col bg-[#080c14]">
      <ControlMenu />
      <ColorKey cellLineMap={cellLineMap} />
      {/* Boxes Container */}
      <div className="grid gap-4 mt-4 grid-cols-[repeat(auto-fill,minmax(310px,1fr))] w-full p-6">
        {boxData.map((box: IBox) => <BoxItem key={box.id} box={box} cellLineMap={cellLineMap} />)}
      </div>
    </main>
  );
}

export default InventoryPage;