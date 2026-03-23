import { boxData } from "~/utils/data";
import type { Box } from "~/utils/interfaces";

// Single Box Component
const BoxItem: React.FC<{box: Box}> = ({box}) => {
  return (
    <div className={`bg-[#0f1624] border ${box.essential ? "border-[#f59e0b40] hover:border-[#f59e0b73]" : 
    "border-[#253552]"} w-1/3 aspect-square rounded-lg transition duration-150`}>
      {/* Header */}
      <div className="flex flex-row gap-2 bg-[#161f30] px-2 py-2 border-b border-[#1e2d47]">
        <div className={`${box.essential ? 'bg-[#f59e0b1f] text-[#f59e0b]' : 'bg-[#38bdf81a] text-[#38bdf8]'} 
        text-[10px] flex justify-center items-center px-1.5 rounded-md`}>
          {box.essential ? "Essential Box" : 'Box'}
        </div>
        <p className="text-[12px] text-[#dde5f0]">{box.name}</p>
      </div>
      {/* Filled bar */}
      <div>

      </div>
      {/* Box grid */}
      <div className="p-2">
        {/* Column headers */}
        <div className="grid grid-cols-9 h-full w-full">
          {Array.from({length: box.columns},(_,index) => 
            <p className="text-[8px] text-[#4a6080] text-center">{index+1}</p>
          )}
        </div>
        {/* Vials container */}
        <div className="grid grid-cols-9 grid-rows-9 h-full w-full">
          {Array.from({length: box.rows * box.columns},(_,index) => 
            <div className="bg-[#0b1220] border border-[#0f1929] aspect-square rounded-sm" />
          )}
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
        {boxData.map((box: Box) => <BoxItem box={box} />)}
      </div>
    </main>
  );
}

export default InventoryPage;